import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { FindUserDto } from './dto/find.user.dto';
import { USER_SERVICE_NAME, UserServiceController, UserServiceControllerMethods, DeleteUserRequest, DeleteUserResponse } from './users.pb';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('users')
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod(USER_SERVICE_NAME, 'createUser')
  async createUser(request: CreateUserDto)  {
    return this.userService.createUser(request);
  }

  @GrpcMethod(USER_SERVICE_NAME, 'findOneUser')
  async findOneUser(id: FindUserDto) {
    return this.userService.findOneUser(id);
  }

  @GrpcMethod(USER_SERVICE_NAME, 'deleteUser')
  async deleteUser(id: FindUserDto) {
    return this.userService.deleteUser(id);
  }
}