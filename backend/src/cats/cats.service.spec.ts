import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Cat } from './schemas/cat.schema';
import { Model } from 'mongoose';

const mockCat = {
  name: 'Cat #1',
  breed: 'Breed #1',
  age: 4,
};

describe('CatsService', () => {
  let service: CatsService;
  let model: Model<Cat>;

  const catsArray = [
    {
      name: 'Cat #1',
      breed: 'Breed #1',
      age: 4,
    },
    {
      name: 'Cat #2',
      breed: 'Breed #2',
      age: 2,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getModelToken(Cat.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockCat),
            constructor: jest.fn().mockResolvedValue(mockCat),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
            countDocuments: jest.fn().mockResolvedValueOnce(1).mockResolvedValueOnce(2),
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

    service = module.get<CatsService>(CatsService);
    model = module.get<Model<Cat>>(getModelToken(Cat.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all cats', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(catsArray),
    } as any);
    const cats = await service.findAll();
    expect(cats).toEqual(catsArray);
  });

  it('should insert a new cat', async () => {
    // jest.spyOn(model, 'create').mockImplementationOnce(() =>
    //   Promise.resolve(1),
    //   // Promise.resolve({
    //   //   name: 'Cat #1',
    //   //   breed: 'Breed #1',
    //   //   age: 4,
    //   // }),
    // );
    // jest.spyOn(model, 'countDocuments').mockResolvedValueOnce(0).mockResolvedValueOnce(1);
    const newCat = await service.create({
      name: 'Cat #1',
      breed: 'Breed #1',
      age: 4,
    });
    expect(newCat).toEqual(1);
    // expect(newCat).toEqual(mockCat);
  });
});
