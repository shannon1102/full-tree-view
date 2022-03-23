import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TransactionService } from "src/common/transaction.service";
import { BaseRepository } from "src/repositories/base.repository";
import { Department, DepartmentDocument } from "./schemas/department.schema";

@Injectable()
export class DepartmentRepository extends BaseRepository<Department, DepartmentDocument> {
    constructor(@InjectModel(Department.name) private readonly departmentModel: Model<DepartmentDocument>,
        private readonly _transactionService: TransactionService
    ) {
        super(departmentModel, _transactionService)
    }
}