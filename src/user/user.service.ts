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

  findOneUser(request: FindOneUserRequest): FindOneUserResponse {
    try{
      const user = this.userModel.findById(request.id);
      return { message: 'Usuario Encontrado', error: undefined };
    }catch(error){
      return {
        message: 'Error al crear el comentario',
        error: undefined,
      };
    } 
  }

  deleteUser(request: DeleteUserRequest): DeleteUserResponse {
    try{
      const success = this.userModel.findByIdAndDelete(request.id);
      return { message: 'Usuario Eliminado', error: undefined };
    }catch(error){
      return {
        message: 'Error al crear el comentario',
        error: undefined,
      };
    }
  }
}
