import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeService } from 'src/services/employee/employee.service';
import { TransactionInterceptor } from 'src/common/transaction.interceptor';

@Controller('employee')
@UseInterceptors(TransactionInterceptor)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService,
  ) {
    console.log("EmployeeController - constructor()");
  }

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    console.log("EmployeeController create() - dto: ", createEmployeeDto);
    return this.employeeService.create(createEmployeeDto);


  }

  @Get()
  findAll() {
    // console.log("EmployeeController - findAll() - process.env.DATABASE_CONNECTION: ", process.env.DATABASE_CONNECTION);

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
