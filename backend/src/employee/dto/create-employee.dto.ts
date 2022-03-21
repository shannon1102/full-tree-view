import { PartialType } from "@nestjs/mapped-types";
import { Employee } from "../schemas/employee.schema";

export class CreateEmployeeDto extends PartialType(Employee) {
    name: string;
    departmentCode: string;
    createdTime: Date;
}
