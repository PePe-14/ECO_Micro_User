import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create.user.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { Empty, UserServiceClient, UserList, CreateUserDto as ProtoCreateUserDto, FindUserRequest, DeleteUserRequest, DeleteUserResponse } from './users.pb';

@Injectable()
export class UserService implements OnModuleInit {
  private userServiceClient: UserServiceClient;

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel('User_service') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userServiceClient = this.client.getService<UserServiceClient>('UserService');
  }

  async findAll(request: Empty): Promise<UserList> {
    const users = await this.userModel.find().exec();

    const userList: UserList = {
      users: users.map((user) => ({
        username: user.username,
        password: user.password,
        email: user.email,
      })),
    };

    return userList;
  }

  createUser(newUser: CreateUserDto): Promise<User> {
    const protoCreateUser: ProtoCreateUserDto = {
      username: newUser.username,
      password: newUser.password,
      email: newUser.email,
    };
    return this.userServiceClient.createUser(protoCreateUser).toPromise();
  }
  
  findById(id: string): Promise<User> {
    const request: FindUserRequest = { id };
    return this.userServiceClient.findById(request).toPromise()
      .then((response) => {
        // Suponiendo que el servicio gRPC devuelve un objeto 'User'
        return response as User;
      })
      .catch((error) => {
        // Manejar el error según sea necesario
        throw new Error(`Error fetching user by ID: ${error}`);
      });
  }
  
  deleteById(id: string): Promise<DeleteUserResponse> {
    const request: DeleteUserRequest = { id };
    return this.userServiceClient.deleteById(request).toPromise();
  }
  
}
