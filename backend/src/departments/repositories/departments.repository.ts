import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "src/repository/base.repository";
import { DepartmentDocument, Department } from "../schemas/department.schema";

@Injectable()
export class DepartmentRepository extends BaseRepository<Department, DepartmentDocument> {
    constructor(@InjectModel(Department.name) private readonly departmentModel: Model<DepartmentDocument>) {
        super(departmentModel)
    }
}