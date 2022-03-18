import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './schemas/cat.schema';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) { }

  @Post()
  async create(@Body(new ValidationPipe({ transform: true })) createCatDto: CreateCatDto): Promise<Number> {
    console.log("cats.controller - create() - dto: ", createCatDto);

    return await this.catsService.create(createCatDto);
  }

  @Get("findAll")
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cat> {
    return this.catsService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    console.log("Delete 1 cat");

    return this.catsService.delete(id);
  }
  @Delete()
  async deleteAll() {
    console.log("Delete all cats");
    return this.catsService.deleteAll();
  }
}
