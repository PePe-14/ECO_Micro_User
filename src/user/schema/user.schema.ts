import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({
  collection: 'usuario',
  timestamps: true,
})
export class User extends Document{

  @Prop({
    primaryKey: true,
    type: `auto()`,
  })
  id: mongoose.Schema.Types.ObjectId;
  
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
