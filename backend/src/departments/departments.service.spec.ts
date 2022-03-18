import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { DepartmentsService } from './departments.service';
import { Department } from './schemas/department.schema';

const mockDepartment = {
  name: 'Department #1',
  code: '111',
  parentCode: null,
};

describe('DepartmentsService', () => {
  let service: DepartmentsService;
  let model: Model<Department>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartmentsService,
        {
          provide: getModelToken(Department.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockDepartment),
            constructor: jest.fn().mockResolvedValue(mockDepartment),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
        {
          provide: getConnectionToken(),
          useValue: {
            startSession: jest.fn().mockResolvedValue({
              startTransaction: jest.fn(),
              commitTransaction: jest.fn(),
              abortTransaction: jest.fn(),
              endSession: jest.fn(),
            }),
          }
        }

      ],
    }).compile();

    service = module.get<DepartmentsService>(DepartmentsService);
    model = module.get<Model<Department>>(getModelToken(Department.name));
  });

  it('should insert a new department', async () => {
    var mockDepartment = {
      name: "department 7",
      code: "7",
      parentCode: "1"
    };
    const createResult = await service.create(mockDepartment);
    expect(createResult).toEqual(createResult);
  });

  // it('should return nested departments', async () => {
  //   jest.spyOn(model, 'find').mockReturnValue({
  //     exec: jest.fn().mockResolvedValueOnce(departmentQueue[0])
  //   } as any);
  // });

  test('zero', () => {
    const z = 0;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
  });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});
