import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create.user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.appService.findAll();
  }

  @Post()
  async createUser(@Body()newUser: CreateUserDto): Promise<User> {
    return this.appService.createUser(newUser);
  }

  @Get('id')
  async findOne(@Param('id')id: string): Promise<User> {
    const user = this.appService.findById(id);

    if(!user){
      throw new NotFoundException('No se encontro al usuario');
    }

    return user;
  }

  /*
  @Get('id')
  async deleteOne(@Param('id')id: string): Promise<User> {
    return this.appService.deleteById(id);
  }*/

  
}
