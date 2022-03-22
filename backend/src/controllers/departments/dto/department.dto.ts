import { ObjectId } from "mongoose";

export class DepartmentResponseDto {
    code: string;
    name: string;
    parentCode: string;
    id: ObjectId;
    childDepartments: DepartmentResponseDto[];
}