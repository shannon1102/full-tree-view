import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaBase } from "src/repositories/schema.base";
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;
// export interface EmployeeDocument extends Employee, Document {

// }

@Schema()
export class Employee extends SchemaBase {
    @Prop()
    name: string;

    @Prop()
    departmentCode: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);