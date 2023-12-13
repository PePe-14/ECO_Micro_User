import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>){}
  
  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async createUser(newUser: CreateUserDto) {
    const user = await this.userModel.create(newUser); 
    return user;
  }

  async findById(id: string) {
    return this.userModel.findById(id); 
  }

  async deleteById(id: string) {
    return await this.userModel.findByIdAndDelete(id); 
  }
  
}
