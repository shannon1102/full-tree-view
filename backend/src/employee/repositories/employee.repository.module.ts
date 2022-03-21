import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {  BaseRepository } from "src/repository/base.repository";
import { EmployeeRepository } from "src/employee/repositories/employee.repository";
import { Employee, EmployeeSchema } from "src/employee/schemas/employee.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }])
        // new RepositoryBase<Employee>()
    ],
    providers: [
        EmployeeRepository
    ],
    exports: [
        EmployeeRepository
    ]
})
export class EmployeeRepositoryModule {}