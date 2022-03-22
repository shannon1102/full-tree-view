import { Optional } from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
    @Optional()
    name: string;
    @Optional()
    departmentCode: string;
    
    @Exclude()
    createdTime: Date;
    @Exclude()
    modifiedTime: Date;
}
