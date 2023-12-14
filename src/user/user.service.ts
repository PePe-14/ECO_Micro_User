import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserRequest, CreateUserResponse, FindOneUserRequest, FindOneUserResponse, DeleteUserRequest, DeleteUserResponse } from './users.pb';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel:Model<User>,
  ) {}

  async createUser(request: CreateUserRequest): Promise<CreateUserResponse> {
    const newUser = new User();
    newUser.username = request.username,
    newUser.password = request.password,
    newUser.email = request.email,

    this.userModel.create(newUser);
    return { message: 'Usuario creado', error: undefined }; 

  }

  async findOneUser(request: FindOneUserRequest): Promise<FindOneUserResponse> {
    console.log(request);
    try{
      const user = await this.userModel.findById(request); //request es el id
      if(user != null){
        return { message: 'Usuario Encontrado', error: undefined };
      }
    }catch(error){
      return {
        message: 'Usuario no existe',
        error: 'Not Found',
      };
    } 
  }

  async deleteUser(request: DeleteUserRequest): Promise<DeleteUserResponse> {
    try{
      const user = await this.userModel.findById(request);  //request es el id
      if(user != null){
        this.userModel.findByIdAndDelete(user._id).exec();
        return { message: 'Usuario Eliminado', error: undefined };
      }
    }catch(error){
      return {
        message: 'Usuario no existe',
        error: 'Error al eliminar',
      };
    }
  } 
}
