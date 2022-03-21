// CRUD
import { Injectable } from '@nestjs/common';
import { InjectModel, MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { CreateEmployeeDto } from 'src/employee/dto/create-employee.dto';
import { Employee, EmployeeDocument, EmployeeSchema } from 'src/employee/schemas/employee.schema';
import { SchemaBase } from 'src/repository/schema.base';
const mongoose = require("mongoose")
@Injectable()
export class BaseRepository<B extends SchemaBase, BM> {
    private readonly baseModel: Model<BM>;

    constructor(_baseModel: Model<BM>) {
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

    create(objectDto: B): Promise<BM> {
        console.log("Object create in base repo: ", objectDto);
        objectDto.createdTime = new Date();
        return this.baseModel.create(objectDto);
    }

    async find(query?: any): Promise<BM[]> {
        console.log("đã vào find() ở repo");

        return this.baseModel.find(query).exec();
    }

    async findOne(query?: any): Promise<BM> {
        console.log("đã vào find() ở repo");

        return this.baseModel.findOne(query).exec();
        // var result = this.baseModel.findOne(query).exec();
        // return result ? result[0] : null;
    }
    // @Prop()
    // editTime: Date;
    // @Prop()
    // createdTime: Date;

    getClassName(): string {
        // var ins = new B();
        var ins = new Employee();
        return "getClassName(): " + ins.constructor.name;
    }

    // getGenericTypeClassName(): string {
    //     this.createInstance<B>(B);
    // }
}
