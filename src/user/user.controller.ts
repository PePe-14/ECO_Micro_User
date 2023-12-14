import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { Empty, USER_SERVICE_NAME, UserList, UserServiceController, UserServiceControllerMethods, CreateUserDto as ProtoCreateUserDto, FindUserRequest, DeleteUserRequest, DeleteUserResponse } from './users.pb';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('users')
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(private userService: UserService) {}

  @GrpcMethod(USER_SERVICE_NAME, 'findAll')
  findAll(request: Empty): Promise<UserList> {
    return this.userService.findAll(request);
  }

  @GrpcMethod(USER_SERVICE_NAME, 'createUser')
  async createUser(newUser: CreateUserDto): Promise<ProtoCreateUserDto> {
    return this.userService.createUser(newUser);
  }

  @GrpcMethod(USER_SERVICE_NAME, 'findById')
  async findById(@Param('id') id: string): Promise<ProtoCreateUserDto> {
    return this.userService.findById(id);
  }

  @GrpcMethod(USER_SERVICE_NAME, 'deleteById')
  async deleteById(@Param('id') id: string): Promise<DeleteUserResponse> {
    return this.userService.deleteById(id);
  }
}
