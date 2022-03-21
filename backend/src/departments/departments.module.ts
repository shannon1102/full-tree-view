import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Department, DepartmentSchema } from './schemas/department.schema';
import { DepartmentRepositoryModule } from './repositories/departments.repository.module';
import { EmployeeRepositoryModule } from 'src/employee/repositories/employee.repository.module';

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
