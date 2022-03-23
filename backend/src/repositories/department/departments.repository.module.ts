import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TransactionService } from "src/common/transaction.service";
import { DepartmentRepository } from "./departments.repository";
import { Department, DepartmentSchema } from "./schemas/department.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Department.name, schema: DepartmentSchema }])

    ],
    providers: [
        DepartmentRepository,
        TransactionService
    ],
    exports: [
        TransactionService,
        DepartmentRepository
    ]
})
export class DepartmentRepositoryModule { }