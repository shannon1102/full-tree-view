import { PartialType } from "@nestjs/mapped-types";
import { IsOptional, IsNotEmpty, Equals } from "class-validator";
import { Department } from "../schemas/department.schema";

export class CreateDepartmentDto extends PartialType(Department) {
    @IsNotEmpty({ message: "Name must not empty" })
    readonly name: string;
    @IsNotEmpty({ message: "Code must not empty" })
    readonly code: string;

    @IsOptional()
    @IsNotEmpty()
    readonly parentCode: string;
    
    rootParentCode: string;
    createdTime: Date;
}
