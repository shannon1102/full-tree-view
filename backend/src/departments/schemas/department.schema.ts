import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SchemaBase } from 'src/repository/schema.base';


export type DepartmentDocument = Department & Document;

@Schema()
export class Department extends SchemaBase {
    @Prop()
    name: string;

    @Prop()
    code: string;

    @Prop()
    parentCode: string;

    @Prop()
    rootParentCode: string;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);