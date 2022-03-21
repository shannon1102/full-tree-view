import { BaseRepository } from "src/repository/base.repository"
import { SchemaBase } from "src/repository/schema.base";

export class BaseService<S extends SchemaBase, SD> {
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


    helloHuy() {
        console.log('Vao hello Huy o base service roi nhe');
        console.log("Repo GetClassName = ", this.baseRepository.getClassName());
    }
}