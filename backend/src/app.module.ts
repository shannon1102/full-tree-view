import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { DepartmentsModule } from './departments/departments.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Hwuang:q@cluster0.ot4kn.mongodb.net/departments_management?retryWrites=true&w=majority'),
    CatsModule,
    DepartmentsModule,
  ],
})
export class AppModule {}
