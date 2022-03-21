import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {  SchemaBase } from "src/departments/repository/repositoryBase";
import { Employee, EmployeeSchema } from "src/employee/schemas/employee.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }])
    ],
    providers: [
        SchemaBase
    ],
    exports: [
        SchemaBase
    ]
})
export class SchemaBaseModule {}