import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BaseRepository } from 'src/repositories/base.repository';
import { EmployeeRepositoryModule } from 'src/repositories/employee/employee.repository.module';
import { Employee, EmployeeSchema } from 'src/repositories/employee/schemas/employee.schema';
import { EmployeeService } from 'src/services/employee/employee.service';
console.log("Employee module first");
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }]),
    EmployeeRepositoryModule
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule { }

console.log("Employee module second");