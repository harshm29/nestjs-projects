import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.CreateUser(createUserDto);
  }
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    console.log(isValidId);
    if (!isValidId) throw new HttpException('id is not valid', 400);

    const FindUser = await this.userService.getUserById(id);
    if (!FindUser) throw new HttpException('User not founded', 204);
    return FindUser;
  }

  @Patch(':id')
  async userUpdate(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    console.log(isValidId);
    if (!isValidId) throw new HttpException('id is not valid', 400);
    const UpdateUser = await this.userService.updateUser(id, updateUserDto);
    if (!UpdateUser) throw new HttpException('User not founded', 204);
    return UpdateUser;
  }
}
