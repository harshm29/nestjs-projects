import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/Uses.schema'; // Correct the import path
import { CreateUserDto } from './dto/CreateUser.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async CreateUser(CreateUserDto: CreateUserDto) {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(CreateUserDto.password, 10);

    // Create a new user document
    const newUser = new this.userModel({
      ...CreateUserDto,
      password: hashedPassword, // Set the hashed password
    });

    return newUser.save();
  }

  async verifyPassword(
    user: User,
    plainTextPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, user.password);
  }

  async getUsers() {
    return this.userModel.find();
  }

  async getUserById(ID: string) {
    return await this.userModel.findById(ID);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }
}
