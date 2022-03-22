import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "src/repositories/base.repository";
import { Employee, EmployeeDocument } from "./schemas/employee.schema";

@Injectable()
export class EmployeeRepository extends BaseRepository<Employee, EmployeeDocument> {
    constructor(@InjectModel(Employee.name) private readonly repositoryModel: Model<EmployeeDocument>) {
        super(repositoryModel);
    }
}