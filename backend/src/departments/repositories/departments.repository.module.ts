import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EmployeeRepository } from "src/employee/repositories/employee.repository";
import { Department, DepartmentSchema } from "../schemas/department.schema";
import { DepartmentRepository } from "./departments.repository";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Department.name, schema: DepartmentSchema }])

    ],
    providers: [
        DepartmentRepository
    ],
    exports: [
        DepartmentRepository
    ]
})
export class DepartmentRepositoryModule {}