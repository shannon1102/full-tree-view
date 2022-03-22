import { BaseRepository } from "src/repository/base.repository"
import { Document } from 'mongoose';
import { SchemaBase } from "src/repository/schema.base";

export class BaseService<S extends SchemaBase, SD extends Document & SchemaBase> {
    constructor(private readonly baseRepository: BaseRepository<S, SD>) {

    }

    create(createObj: S): Promise<SD> {
        console.log("BaseService - create()");

        return this.baseRepository.create(createObj);
    }

    findAll(): Promise<SD[]> {
        console.log("BaseService - findAll()");
        return this.baseRepository.find();
    }
    findOne(id: string) {
        return this.baseRepository.findOne(id);
    }
    remove(id: string) {
        return this.baseRepository.remove(id);
    }

    update(id: string, updateEmployeeDto: S) {
        return this.baseRepository.update(id, updateEmployeeDto);
    }
    // helloHuy() {
    //     console.log('Vao hello Huy o base service roi nhe');
    //     console.log("Repo GetClassName = ", this.baseRepository.getClassName());
    // }
}