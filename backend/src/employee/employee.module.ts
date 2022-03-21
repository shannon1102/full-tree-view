import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { Employee, EmployeeSchema } from './schemas/employee.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SchemaBase } from 'src/departments/repository/repositoryBase';
import { SchemaBaseModule } from 'src/repository/SchemaBase.module';
console.log("Employee module first");
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }]),
    SchemaBaseModule
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }])
//   ],
//   controllers: [SchemaBase],
//   providers: []
// })
export class EmployeeModule { }

console.log("Employee module second");