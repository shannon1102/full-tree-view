import { IsOptional, IsNotEmpty, Equals } from "class-validator";

export class CreateDepartmentDto {
    @IsNotEmpty({message: "Name must not empty"})
    readonly name: string;
    @IsNotEmpty({message: "Code must not empty"})
    readonly code: string;
    
    
    @IsOptional()
    @IsNotEmpty()
    readonly parentCode: string;
  
    rootParentCode: string;
}
