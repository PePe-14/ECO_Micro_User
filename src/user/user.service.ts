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

  async createUser(newUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(newUserDto); // Crea una instancia de User usando el DTO
    const createdUser = await newUser.save(); // Guarda el nuevo usuario en la base de datos
    return createdUser;
  }

  async findById(id: string): Promise<User> {
    const newUser = this.userModel.findById(id); 
    return newUser;
  }

  /*
  async deleteById(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id); 
  }*/


  
}
