import { BaseRepository } from "src/repositories/base.repository"
import { Document } from 'mongoose';
import { SchemaBase } from "src/repositories/schema.base";

export class BaseService<TSchema extends SchemaBase, TSchemaDocument extends Document & SchemaBase> {
    constructor(private readonly baseRepository: BaseRepository<TSchema, TSchemaDocument>) {
    }

    create(createObj: TSchema): Promise<TSchemaDocument> {
        console.log("BaseService - create()");
        return this.baseRepository.create(createObj);
    }

    findAll(): Promise<TSchemaDocument[]> {
        console.log("BaseService - findAll()");
        return this.baseRepository.find();
    }
    findOne(id: string) {
        return this.baseRepository.findOne(id);
    }
    remove(id: string) {
        return this.baseRepository.remove(id);
    }
    update(id: string, updateEmployeeDto: TSchema) {
        return this.baseRepository.update(id, updateEmployeeDto);
    }
}