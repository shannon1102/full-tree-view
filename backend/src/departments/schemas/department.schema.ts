import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'


export type DeparmentDocument = Department & Document;

@Schema()
export class Department {
    @Prop()
    name: string;

    @Prop()
    code: string;

    @Prop()
    parentCode: string;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);