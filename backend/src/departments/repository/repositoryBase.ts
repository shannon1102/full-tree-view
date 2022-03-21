// CRUD
import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { Employee, EmployeeDocument } from 'src/employee/schemas/employee.schema';

@Injectable()
export class SchemaBase {

    constructor(@InjectModel(Employee.name) readonly employeeModel: Model<EmployeeDocument>) {

    }
    // @Prop()
    // editTime: Date;
    // @Prop()
    // createdTime: Date;

    getClassName(): string {
        return SchemaBase.name;
    }
}

class RepositoryBase {

}