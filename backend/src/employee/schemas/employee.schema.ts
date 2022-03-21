import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
    @Prop()
    name: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);