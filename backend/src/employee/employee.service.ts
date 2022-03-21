import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SchemaBase } from 'src/departments/repository/repositoryBase';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee, EmployeeDocument } from './schemas/employee.schema';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly schemaBase: SchemaBase) {
      // schemaBase = new SchemaBase();

  }
  create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.schemaBase.employeeModel.create(createEmployeeDto);
  }

  findAll(): Promise<Employee[]> {
    console.log("Đã sử dụng được schemaBase: ", this.schemaBase.getClassName());

    return this.schemaBase.employeeModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
