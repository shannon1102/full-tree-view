import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { DepartmentsService } from 'src/services/department/departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  create(@Body(new ValidationPipe({transform: true})) createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  findAll() {
    console.log("DepartmentController GetAll()");
    
    return this.departmentsService.getStructuredDepartments();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('DepartmentController GetOne, id = ', id);
    // return new Promise((rs, rj) => {});
    return this.departmentsService.getDetailStructure(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
  //   return this.departmentsService.update(id, updateDepartmentDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentsService.remove(id);
  }
}
