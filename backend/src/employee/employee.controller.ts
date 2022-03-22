import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './schemas/employee.schema';
import { BaseRepository } from 'src/repository/base.repository';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService,

  ) { }

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    console.log("EmployeeController create() - dto: ", createEmployeeDto);
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log("Vao API delete roi");
    
    return this.employeeService.remove(id);
  }
}
