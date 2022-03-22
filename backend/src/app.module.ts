import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { DepartmentsModule } from './controllers/departments/departments.module';
import { EmployeeModule } from './controllers/employee/employee.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION),
    // MongooseModule.forRoot('mongodb+srv://Hwuang:q@cluster0.ot4kn.mongodb.net/departments_management?retryWrites=true&w=majority'),
    CatsModule,
    DepartmentsModule,
    EmployeeModule,
  ],
})
export class AppModule { }

// console.log("Connection = ", process.env.DATABASE_CONNECTION);
