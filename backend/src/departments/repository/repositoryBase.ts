 // CRUD
 import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
 import { Document } from 'mongoose';

class SchemaBase extends Document {
    @Prop()
    editTime: Date;
    @Prop()
    createdTime: Date;
}

class RepositoryBase {

}