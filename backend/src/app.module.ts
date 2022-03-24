import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { CatsService } from './cats/cats.service';
import { Cat, CatSchema } from './cats/schemas/cat.schema';
import { DepartmentsController } from './departments/departments.controller';
import { DepartmentsModule } from './departments/departments.module';
import { DepartmentsService } from './departments/departments.service';
import { Department, DepartmentSchema } from './departments/schemas/department.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Hwuang:q@cluster0.ot4kn.mongodb.net/departments_management?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{ name: Department.name, schema: DepartmentSchema }]),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    // CatsModule,
    // DepartmentsModule,
  ],
  controllers: [
    DepartmentsController,
    CatsController,
  ],
  providers: [
    DepartmentsService,
    CatsService
  ]
})
export class AppModule { }
