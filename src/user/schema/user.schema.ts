import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'usuario',
  timestamps:true  
})
export class User extends Document{
  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop({ unique: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
