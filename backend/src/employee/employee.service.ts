import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/repository/base.repository';
import { BaseService } from 'src/services/base.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeRepository } from './repositories/employee.repository';
import { Employee, EmployeeDocument } from './schemas/employee.schema';

@Injectable()
export class EmployeeService extends BaseService<Employee, EmployeeDocument> {
  constructor(
    private readonly employeeRepository: EmployeeRepository) {
    // schemaBase = new SchemaBase();
    super(employeeRepository);
    // this.helloHuy();
  }

  // create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
  //   return this.employeeRepository.create(createEmployeeDto);
  // }

  // findAll(): Promise<Employee[]> {
  //   // this.helloHuy();
  //   console.log("Đã sử dụng được schemaBase: ", this.employeeRepository.getClassName());
  //   // return null;
  //   // return this.repository.find().exec();
  //   return this.employeeRepository.find();
  // }

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
