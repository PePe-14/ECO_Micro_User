import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';
import {
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserRequest,
  DeleteUserResponse,
  Empty,
  FindOneUserRequest,
  FindOneUserResponse,
  GetAllUsersResponse,
  USER_SERVICE_NAME
} from './users.pb';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod(USER_SERVICE_NAME, 'createUser')
  async createUser(request: CreateUserRequest): Promise<CreateUserResponse> {
    return this.userService.createUser(request);
  }

  @GrpcMethod(USER_SERVICE_NAME, 'getAllUsers')
  async getAllUsers(request: Empty): Promise<GetAllUsersResponse> {
    return this.userService.getAllUsers(request);
  }

  @GrpcMethod(USER_SERVICE_NAME, 'findOneUser')
  async findOneUser(request: FindOneUserRequest): Promise<FindOneUserResponse> {
    return this.userService.findOneUser(request);
  }

  @GrpcMethod(USER_SERVICE_NAME, 'deleteUser')
  async deleteUser(request: DeleteUserRequest): Promise<DeleteUserResponse> {
    return this.userService.deleteUser(request);
  }
}
