import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';

describe('DepartmentsController', () => {
  let controller: DepartmentsController;
  let service: DepartmentsService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentsController],
      providers: [
        {
          provide: DepartmentsService,
          useValue: {
            findOne: jest.fn().mockResolvedValue({})
          }
        }

      ],
    }).compile();

    controller = module.get<DepartmentsController>(DepartmentsController);
    service = module.get<DepartmentsService>(DepartmentsService);
  });

  describe("findOne()", () => {
    it("Should return corrected department tree", async () => {
      expect(controller.findOne("2")).resolves.toEqual({})

      expect(service.getDetailStructure).toHaveBeenCalled();
    })
  })

  // test('zero', () => {
  //   const z = 0;
  //   expect(z).not.toBeNull();
  //   expect(z).toBeDefined();
  //   expect(z).not.toBeUndefined();
  //   expect(z).not.toBeTruthy();
  //   expect(z).toBeFalsy();
  // });
  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });
});
