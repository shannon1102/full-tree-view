import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaBase } from "src/repository/schema.base";

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee extends SchemaBase {
    @Prop()
    name: string;

    @Prop()
    departmentCode: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);