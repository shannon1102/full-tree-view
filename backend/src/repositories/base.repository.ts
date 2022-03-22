// CRUD
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel, MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, ObjectId } from 'mongoose';
import { SchemaBase } from 'src/repositories/schema.base';
const mongoose = require("mongoose")
@Injectable()
export class BaseRepository<T extends SchemaBase, TD extends Document & SchemaBase> {
    private readonly baseModel: Model<TD>;

    constructor(_baseModel: Model<TD>) {
        this.baseModel = _baseModel;
    }
    // constructor(c: new () => B) {
    //     // constructor(@InjectModel(B.name) readonly employeeModel: Model<EmployeeDocument>) {
    //     // this.createInstance(B).constructor.name;
    //     console.log("B name at RepositoryBase: ", c.name);

    //     this.baseModel = mongoose.model(c.name, EmployeeSchema);
    //     console.log("baseModel = ", this.baseModel);
    // }

    createInstance<B>(c: new () => B): B {
        return new c();
    }

    create(objectDto: T): Promise<TD> {
        console.log("Object create in base repo: ", objectDto);
        objectDto.createdTime = new Date();
        return this.baseModel.create(objectDto);
    }

    async find(query?: any): Promise<TD[]> {
        console.log("đã vào find() ở repo");

        return this.baseModel.find(query).exec();
    }

    async findOne(id: any): Promise<TD> {
        console.log("đã vào find() ở repo");

        return this.baseModel.findOne({ _id: id }).exec();
        // var result = this.baseModel.findOne(query).exec();
        // return result ? result[0] : null;
    }

    async remove(id: string) {
        // return `This action removes a #${id} department`;
        const deletedEntity = await this.baseModel
            .findByIdAndRemove({ _id: id })
            .exec();
        return deletedEntity;
    }
    async update(id: any, dto: T) {
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
