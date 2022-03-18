import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose } from 'mongoose';
import * as mongoose from 'mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat, CatDocument } from './schemas/cat.schema';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat.name) private readonly catModel: Model<CatDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection
  ) { }

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    var session = await this.catModel.startSession();
    session.startTransaction();
    const createdCat = await this.catModel.create(createCatDto);
    // await transactionSession.abortTransaction();
    
    var count = await this.catModel.countDocuments();
    session.commitTransaction();
    // const transactionSession = await this.connection.startSession();
    // transactionSession.startTransaction();

    // const createdCat = await this.catModel.create(createCatDto);
    // // await transactionSession.abortTransaction();

    // transactionSession.endSession();

    console.log("count = ", count);

    return createdCat;
    // transactionSession.withTransaction(() => {

    // })
    // const createdCat = await this.catModel.create(createCatDto);
    // return createdCat;
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

    const deletedCat = await this.catModel.deleteMany().exec();
    return deletedCat;
  }
}
