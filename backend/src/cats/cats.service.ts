import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose } from 'mongoose';
import * as mongoose from 'mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat, CatDocument } from './schemas/cat.schema';
import { assert } from 'console';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat.name) private readonly catModel: Model<CatDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection
  ) { }

  async create(createCatDto: CreateCatDto): Promise<Number> {
    // console.log("CatService create()");
    var session = await this.connection.startSession();
    // console.log("CatService create() initialized session");
    var catCountBefore = await this.catModel.countDocuments();
    // console.log("CatService create() got countBefore");

    try {
      await session.startTransaction();
      // console.log("cats.service - create() - createCatDto: ", createCatDto);

      const createdCat = await this.catModel.create([ createCatDto ], { session: session });
      // const createdCatSecond = await this.catModel.create([{ createCatDto }], { session: session });
      await session.commitTransaction();
    } catch (error) {
      // console.error("Vao phan error roi");
      console.error("CatService create() catch", error);
      await session.abortTransaction();
    }
    finally {
      session.endSession();
    }

    var catCountAfter = await this.catModel.countDocuments();

    return catCountAfter - catCountBefore;
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async findOne(id: string): Promise<Cat> {
    return this.catModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.catModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }

  async deleteAll() {
    // const deletedCat = await this.catModel
    //   .findByIdAndRemove({ _id: id })
    //   .exec();

    const deletedCat = await this.catModel.deleteMany({ $or: [{ age: { $gte: 2 } }, { age: null }] });
    return deletedCat;
  }
}
