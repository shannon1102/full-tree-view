import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { Employee, EmployeeSchema } from './schemas/employee.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BaseRepository } from 'src/repository/base.repository';
import { EmployeeRepositoryModule } from 'src/employee/repositories/employee.repository.module';
import { EmployeeRepository } from './repositories/employee.repository';
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