import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EmployeeRepository } from "src/repositories/employee/employee.repository";
import { DepartmentRepository } from "./departments.repository";
import { Department, DepartmentSchema } from "./schemas/department.schema";

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