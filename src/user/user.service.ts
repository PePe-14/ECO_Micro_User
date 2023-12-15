import { Injectable } from '@nestjs/common';
import { 
  CreateUserRequest, 
  CreateUserResponse, 
  DeleteUserRequest, 
  DeleteUserResponse, 
  Empty, 
  GetAllUsersResponse, 
  FindOneUserRequest, 
  FindOneUserResponse, 
} from './users.pb';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {}

    async createUser(request: CreateUserRequest): Promise<CreateUserResponse> {
        try {
            const user = await this.userModel.findOne({ username: request.username }).exec();

            if (user !== null) {
                return { user: undefined, error: { message: 'Usuario ya existe' } };
            }

            const newUser: User = {
                id: undefined,
                username: request.username,
                password: request.password,
                email: request.email,
            };

            const createdUser = new this.userModel(newUser);
            await createdUser.save();

            return {
                user: {
                    id: createdUser._id,
                    username: createdUser.username,
                    password: createdUser.password,
                    email: createdUser.email,
                },
                error: undefined,
            };
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }

    async getAllUsers(request: Empty): Promise<GetAllUsersResponse> {
        try {
            const userList = await this.userModel.find().lean().exec();

            const transformedUsers = userList.map(user => {
                user.id = user._id.toString();
                delete user._id;
                return user;
            });

            return { users: transformedUsers, error: undefined };
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }

    async findOneUser(request: FindOneUserRequest): Promise<FindOneUserResponse> {
        try {
            const userFound = await this.userModel.findById(request.id).exec();

            if (!userFound) {
                return { user: undefined, error: { message: 'Usuario no encontrado' } };
            }

            const u = {
                id: userFound._id,
                username: userFound.username,
                password: userFound.password,
                email: userFound.email,
            };

            return { user: u, error: undefined };
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
          }
      }
  
      async deleteUser(request: DeleteUserRequest): Promise<DeleteUserResponse> {
          try {
              const deletedUser = await this.userModel.findByIdAndDelete(request.id).exec();
  
              if (!deletedUser) {
                  return { isDeleted: false, error: { message: 'Usuario no encontrado' } };
              }
  
              return { isDeleted: true, error: undefined };
          } catch (error) {
              throw new Error(`Error: ${error.message}`);
          }
      }
  }
