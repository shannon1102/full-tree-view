import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BaseRepository } from 'src/repositories/base.repository';
import { EmployeeRepositoryModule } from 'src/repositories/employee/employee.repository.module';
import { Employee, EmployeeSchema } from 'src/repositories/employee/schemas/employee.schema';
import { EmployeeService } from 'src/services/employee/employee.service';
import { TransactionService } from 'src/common/transaction.service';
import { DepartmentRepositoryModule } from 'src/repositories/department/departments.repository.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }]),
    EmployeeRepositoryModule,
    // DepartmentRepositoryModule
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule { }
