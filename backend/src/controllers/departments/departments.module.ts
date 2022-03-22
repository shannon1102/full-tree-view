import { Module } from '@nestjs/common';
import { DepartmentsController } from './departments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeRepositoryModule } from 'src/repositories/employee/employee.repository.module';
import { DepartmentsService } from 'src/services/department/departments.service';
import { DepartmentRepositoryModule } from 'src/repositories/department/departments.repository.module';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: Department.name, schema: DepartmentSchema }])
    DepartmentRepositoryModule,
    EmployeeRepositoryModule
  ],  
  controllers: [DepartmentsController],
  providers: [DepartmentsService]
})
export class DepartmentsModule { }
