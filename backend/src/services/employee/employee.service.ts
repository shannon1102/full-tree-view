import { Injectable } from '@nestjs/common';
import { Employee, EmployeeDocument } from 'src/repositories/employee/schemas/employee.schema';
import { BaseService } from '../../services/base.service';
import { EmployeeRepository } from '../../repositories/employee/employee.repository';
import { CreateEmployeeDto } from 'src/controllers/employee/dto/create-employee.dto';
import { DepartmentRepository } from 'src/repositories/department/departments.repository';
import { CreateDepartmentDto } from 'src/controllers/departments/dto/create-department.dto';

@Injectable()
export class EmployeeService extends BaseService<Employee, EmployeeDocument> {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    // private readonly departmentRepository: DepartmentRepository,
  ) {
    super(employeeRepository);
  }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<EmployeeDocument> {
    var emp1 = await this.employeeRepository.create(createEmployeeDto);
    var emp2 = await this.employeeRepository.create(createEmployeeDto);

    // var newDepartment = new CreateDepartmentDto();
    // newDepartment.name = "department G";
    // newDepartment.code = "G";
    // newDepartment.parentCode = null;
    // var department = await this.departmentRepository.create(newDepartment);
    return emp2;
  }
}
