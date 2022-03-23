// CRUD
import { Injectable, NotFoundException } from '@nestjs/common';
import { Document, Model } from 'mongoose';
import { TransactionService } from 'src/common/transaction.service';
import { SchemaBase } from 'src/repositories/schema.base';
@Injectable()
export class BaseRepository<TSchema extends SchemaBase, TSchemaDocument extends Document & SchemaBase> {
    private readonly baseModel: Model<TSchemaDocument>;
    private readonly transactionService: TransactionService;

    constructor(_baseModel: Model<TSchemaDocument>, _transactionService: TransactionService) {
        this.baseModel = _baseModel;
        this.transactionService = _transactionService;
    }

    async create(objectDto: TSchema): Promise<TSchemaDocument> {
        objectDto.createdTime = new Date();
        console.log(`BaseRepository - create() - obj:  ${objectDto}, session: `, this.transactionService.getSession());
        // console.log(`BaseRepository - create() - obj:`, objectDto);
        const newDocument = await this.baseModel.create([objectDto], { session: this.transactionService.getSession() });
        console.log("BaseRepository - create() - newDocument: ", newDocument);
        return newDocument[0];
    }

    async find(query?: any): Promise<TSchemaDocument[]> {
        return this.baseModel.find(query).exec();
    }

    async findOne(id: any): Promise<TSchemaDocument> {
        return this.baseModel.findOne({ _id: id }).exec();
    }

    async remove(id: string) {
        // return `This action removes a #${id} department`;
        const deletedEntity = await this.baseModel
            .findByIdAndRemove({ _id: id })
            .exec();
        return deletedEntity;
    }
    async update(id: any, dto: TSchema) {
        // const post = await this.baseModel.findByIdAndUpdate({ _id: id }, dto, { new: true });
        const existedDoc = await this.baseModel.findOne({ _id: id }).exec();
        dto.createdTime = existedDoc.createdTime;
        dto.modifiedTime = new Date();
        const post = await this.baseModel.findOneAndReplace({ _id: id }, dto, { new: true });

        if (!post) {
            throw new NotFoundException();
        }
        return post;
    }
}
