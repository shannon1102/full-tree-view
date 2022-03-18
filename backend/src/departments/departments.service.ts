import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Model } from 'mongoose';
import { DeparmentDocument, Department } from './schemas/department.schema';
import { Queue } from 'queue-typescript';
import { DepartmentResponseDto } from './dto/department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department.name) private readonly departmentModel: Model<DeparmentDocument>,
  ) { }

  // async createMany(departments: Department[]) {
  //   this.departmentModel.
  // }

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const createdDepartment = await this.departmentModel.create(createDepartmentDto);
    return createdDepartment;
  }

  async findAll(): Promise<Department[]> {
    // return `This action returns all departments`;
    return this.departmentModel.find().exec();
  }

  async findOne(id: string): Promise<DepartmentResponseDto> {
    console.log("department.service: findOne(), id = ", id);

    let rootNode = await this.departmentModel.findOne({ code: id }).exec();

    console.log("rootNode = ", rootNode);

    // return null;
    if (rootNode == null) {
      return null
    }

    //Chuyển từ node lấy từ db sang node dto
    var mappedNode = this.mapNodeToAutoMapper(rootNode);
    console.log("mappedNode = ", mappedNode);

    //Tạo queue lưu lại các node chưa được lấy child nodes
    let nodeQueue = new Queue<DepartmentResponseDto>(mappedNode);

    while (nodeQueue.length > 0) {
      let currentNode = nodeQueue.dequeue();
      let listChildNodes = await this.departmentModel.find({ parentCode: currentNode.code }).exec();

      console.log("listChildNode = ", listChildNodes);

      //Nếu có danh sách child nodes
      if (listChildNodes != null && listChildNodes.length > 0) {
        //Gán danh sách node con vào node cha

        for (let index = 0; index < listChildNodes.length; index++) {
          const node = listChildNodes[index];
          var mappedChildNode = this.mapNodeToAutoMapper(node);
          currentNode.childDepartments.push(mappedChildNode);
          nodeQueue.enqueue(mappedChildNode);
        }

        console.log("Current node after pushing children: ", currentNode);

      }
    }

    return mappedNode;
  }


  mapNodeToAutoMapper(defaultNode: Department): DepartmentResponseDto {
    var mappedNode = new DepartmentResponseDto();
    mappedNode.name = defaultNode.name;
    mappedNode.code = defaultNode.code;
    mappedNode.parentCode = defaultNode.parentCode;
    mappedNode.id = defaultNode["_id"];
    mappedNode.childDepartments = new Array<DepartmentResponseDto>();

    return mappedNode;
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return `This action updates a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
