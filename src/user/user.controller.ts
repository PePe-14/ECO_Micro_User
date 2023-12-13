import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create.user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async createUser(@Body()newUser: CreateUserDto){
    return this.userService.createUser(newUser);
  }

  @Get(':id')
  async findById(@Param('id')id: string) {
    return this.userService.findById(id); 
  }

  @Delete(':id')
  async deleteById(@Param('id')id: string) {
    return await this.userService.deleteById(id); 
  }
}
