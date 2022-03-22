import { OmitType, PartialType } from "@nestjs/mapped-types";
import { Exclude } from "class-transformer";
import { IsOptional, IsNotEmpty, Equals } from "class-validator";
import { Department } from "src/repositories/department/schemas/department.schema";

export class CreateDepartmentDto extends OmitType(Department, ['modifiedTime'] as const) {
    @IsNotEmpty({ message: "Name must not empty" })
    readonly name: string;
    @IsNotEmpty({ message: "Code must not empty" })
    readonly code: string;

    @IsOptional()
    @IsNotEmpty()
    readonly parentCode: string;
    
    rootParentCode: string;
    createdTime: Date;
    // @Exclude()
    // modifiedTime: Date;
}
