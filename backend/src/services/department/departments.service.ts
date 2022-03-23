import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Queue } from 'queue-typescript';
import * as mongoose from 'mongoose'
import { BaseService } from '../../services/base.service';
import { EmployeeRepository } from 'src/repositories/employee/employee.repository';
import { DepartmentRepository } from 'src/repositories/department/departments.repository';
import { CreateDepartmentDto } from 'src/controllers/departments/dto/create-department.dto';
import { Department, DepartmentDocument } from 'src/repositories/department/schemas/department.schema';
import { DepartmentResponseDto as DepartmentResponseDTO } from 'src/controllers/departments/dto/department.dto';
@Injectable()
export class DepartmentsService extends BaseService<Department, DepartmentDocument> {
  constructor(
    private readonly departmentRepository: DepartmentRepository,
    private readonly employeeRepository: EmployeeRepository,
    @InjectConnection() private readonly connection: mongoose.Connection
  ) {
    super(departmentRepository);
  }

  async create(createDepartmentDto: CreateDepartmentDto): Promise<DepartmentDocument> {
    // console.log("before create session");
    // var session = await this.connection.startSession();
    createDepartmentDto.rootParentCode = null;

    if (createDepartmentDto.parentCode) {
      var parentDepartment = await this.departmentRepository.findOne({ code: createDepartmentDto.parentCode });
      if (parentDepartment == null) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: "parentCode not exist: " + createDepartmentDto.parentCode,
        }, HttpStatus.BAD_REQUEST);
      }

      createDepartmentDto.rootParentCode = parentDepartment.rootParentCode ?? parentDepartment.code;
    }

    const createdDepartment = await this.departmentRepository.create(createDepartmentDto);
    return createdDepartment;
    // try {
    //   await session.startTransaction()
    //   // const createdDepartment = await this.departmentModel.create([createDepartmentDto], { session: session });
    //   await session.commitTransaction();
    // } catch (error) {
    //   await session.abortTransaction();
    //   // throw new Error(error);
    //   console.error(error);
    //   throw new HttpException({
    //     status: HttpStatus.BAD_REQUEST,
    //     error: error,
    //   }, HttpStatus.BAD_REQUEST);
    // }
    // finally {
    //   session.endSession()
    // }
  }

  async getStructuredDepartments(): Promise<DepartmentResponseDTO[]> {
    // var employees = await this.employeeRepository.find();
    // console.log("Employees = ", employees);

    var departments = await this.departmentRepository.find();
    var rootDepartments = departments.filter(x => x.parentCode == null);

    var result = new Array<DepartmentResponseDTO>();
    for (let index = 0; index < rootDepartments.length; index++) {
      const rd = rootDepartments[index];
      result.push(this.constructDepartmentTree(rd, departments.filter(x => x.rootParentCode == rd.code)));
    }

    return result;
  }

  async getDetailStructure(id: string): Promise<DepartmentResponseDTO> {
    console.log("department.service: findOne(), id = ", id);

    let relevantDepartments = await this.departmentRepository.find({ $or: [{ rootParentCode: id }, { code: id }] });
    let rootDepartment = relevantDepartments.find(x => x.code == id);

    console.log("rootNode = ", rootDepartment);

    if (rootDepartment == null) {
      return null;
    }

    return this.constructDepartmentTree(rootDepartment, relevantDepartments);
  }

  private constructDepartmentTree(rootDepartment: DepartmentDocument, relevantDepartments: DepartmentDocument[]): DepartmentResponseDTO {
    if (rootDepartment == null) {
      return null
    }

    var mappedNode = this.mapToResponseDto(rootDepartment);

    let nodeQueue = new Queue<DepartmentResponseDTO>(mappedNode);

    while (nodeQueue.length > 0) {
      let currentNode = nodeQueue.dequeue();
      let children = relevantDepartments.filter(x => x.parentCode == currentNode.code);

      if (children != null && children.length > 0) {
        for (let index = 0; index < children.length; index++) {
          const node = children[index];
          var mappedChildNode = this.mapToResponseDto(node);
          currentNode.childDepartments.push(mappedChildNode);
          nodeQueue.enqueue(mappedChildNode);
        }
      }
    }

    return mappedNode;
  }


  private mapToResponseDto(defaultObj: Department): DepartmentResponseDTO {
    var mappedObj = new DepartmentResponseDTO();
    mappedObj.name = defaultObj.name;
    mappedObj.code = defaultObj.code;
    mappedObj.parentCode = defaultObj.parentCode;
    mappedObj.id = defaultObj["_id"];
    mappedObj.childDepartments = new Array<DepartmentResponseDTO>();

    return mappedObj;
  }
}
