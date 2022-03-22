import { Injectable } from '@nestjs/common';
import { Employee, EmployeeDocument } from 'src/repositories/employee/schemas/employee.schema';
import { BaseService } from '../../services/base.service';
import { EmployeeRepository } from '../../repositories/employee/employee.repository';

@Injectable()
export class EmployeeService extends BaseService<Employee, EmployeeDocument> {
  constructor(
    private readonly employeeRepository: EmployeeRepository) {
    super(employeeRepository);
  }
}
