import { OmitType, PartialType } from "@nestjs/mapped-types";
import { Exclude } from "class-transformer";
import { Employee } from "../schemas/employee.schema";

// export class CreateEmployeeDto extends PartialType(Employee) {
export class CreateEmployeeDto extends OmitType(Employee, ['modifiedTime']) {
    name: string;
    departmentCode: string;
    createdTime: Date;  
    // @Exclude()
    // modifiedTime: Date;
}
