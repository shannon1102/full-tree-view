import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Model, Mongoose } from 'mongoose';
import { DepartmentDocument, Department } from './schemas/department.schema';
import { Queue } from 'queue-typescript';
import { DepartmentResponseDto } from './dto/department.dto';
import * as mongoose from 'mongoose'
import { BaseRepository } from 'src/repository/base.repository';
import { DepartmentRepository } from './repositories/departments.repository';
import { BaseService } from 'src/services/base.service';
import { EmployeeRepository } from 'src/employee/repositories/employee.repository';
@Injectable()
export class DepartmentsService extends BaseService<Department, DepartmentDocument> {
  // private readonly departmentRepository: DepartmentRepository;
  constructor(
    private readonly departmentRepository: DepartmentRepository,
    private readonly employeeRepository: EmployeeRepository,
    // @InjectModel(Department.name) private readonly departmentModel: Model<DeparmentDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection
  ) {
    // this.departmentRepository = _departmentRepository;
    super(departmentRepository);
  }

  // async createMany(departments: Department[]) {
  //   this.departmentModel.
  // }

  async create(createDepartmentDto: CreateDepartmentDto): Promise<DepartmentDocument> {
    // console.log("before create session");
    var session = await this.connection.startSession();

    //gán lại rootParentCode = null đề phòng front-end truyền sai dữ liệu
    createDepartmentDto.rootParentCode = null;

    //#region Validate logic 
    //Nếu có giá trị parentCode thì 
    if (createDepartmentDto.parentCode) {
      // console.log("before findOne()");

      var parentDepartment = await this.departmentRepository.findOne({ code: createDepartmentDto.parentCode });
      // console.log("after findOne()");

      if (parentDepartment == null) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: "parentCode not exist: " + createDepartmentDto.parentCode,
        }, HttpStatus.BAD_REQUEST);
      }

      createDepartmentDto.rootParentCode = parentDepartment.rootParentCode ?? parentDepartment.code;
    }
    //#endregion


    try {
      await session.startTransaction()
      const createdDepartment = await this.departmentRepository.create(createDepartmentDto);
      // const createdDepartment = await this.departmentModel.create([createDepartmentDto], { session: session });
      await session.commitTransaction();
      return createdDepartment[0];
    } catch (error) {
      await session.abortTransaction();
      // throw new Error(error);
      console.error(error);
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: error,
      }, HttpStatus.BAD_REQUEST);
    }
    finally {
      session.endSession()
    }
  }

  async findNestedAll(): Promise<DepartmentResponseDto[]> {
    var employees = await this.employeeRepository.find();
    console.log("Employees = ", employees);

    var departments = await this.departmentRepository.find();
    var rootDepartments = departments.filter(x => x.parentCode == null);

    var result = new Array<DepartmentResponseDto>();
    for (let index = 0; index < rootDepartments.length; index++) {
      const rd = rootDepartments[index];
      result.push(this.constructDepartmentTree(rd, departments.filter(x => x.rootParentCode == rd.code)));
    }

    return result;
  }

  async findOne(id: string): Promise<DepartmentResponseDto> {
    console.log("department.service: findOne(), id = ", id);

    let relevantDepartments = await this.departmentRepository.find({ $or: [{ rootParentCode: id }, { code: id }] });
    let rootNode = relevantDepartments.find(x => x.code == id);
    // let childrenDepartments = await this.departmentModel.find({ $or: [{ rootParentCode: rootNode.code }, { code: id }] }).exec();

    console.log("rootNode = ", rootNode);

    // return null;
    if (rootNode == null) {
      return null
    }

    return this.constructDepartmentTree(rootNode, relevantDepartments);
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return `This action updates a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }

  /**
   * Dựng lên department tree của department gốc
   * @param rootDepartment Deparment gốc
   * @param relevantDepartments Các department mà có liên quan đến department này
   * @returns Department gốc sau khi đã append children của nó
   */
  private constructDepartmentTree(rootDepartment: DepartmentDocument, relevantDepartments: DepartmentDocument[]): DepartmentResponseDto {
    // return null;
    if (rootDepartment == null) {
      return null
    }

    //Chuyển từ node lấy từ db sang node dto
    var mappedNode = this.mapNodeToAutoMapper(rootDepartment);
    // console.log("mappedNode = ", mappedNode);

    //Tạo queue lưu lại các node chưa được lấy child nodes
    let nodeQueue = new Queue<DepartmentResponseDto>(mappedNode);

    while (nodeQueue.length > 0) {
      let currentNode = nodeQueue.dequeue();
      let listChildNodes = relevantDepartments.filter(x => x.parentCode == currentNode.code);

      // console.log("listChildNode = ", listChildNodes);

      //Nếu có danh sách child nodes
      if (listChildNodes != null && listChildNodes.length > 0) {
        //Gán danh sách node con vào node cha

        for (let index = 0; index < listChildNodes.length; index++) {
          const node = listChildNodes[index];
          var mappedChildNode = this.mapNodeToAutoMapper(node);
          currentNode.childDepartments.push(mappedChildNode);
          nodeQueue.enqueue(mappedChildNode);
        }

        // console.log("Current node after pushing children: ", currentNode);
      }
    }

    return mappedNode;
  }


  private mapNodeToAutoMapper(defaultNode: Department): DepartmentResponseDto {
    var mappedNode = new DepartmentResponseDto();
    mappedNode.name = defaultNode.name;
    mappedNode.code = defaultNode.code;
    mappedNode.parentCode = defaultNode.parentCode;
    mappedNode.id = defaultNode["_id"];
    mappedNode.childDepartments = new Array<DepartmentResponseDto>();

    return mappedNode;
  }
}
