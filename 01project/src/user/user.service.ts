import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/Uses.schema'; // Correct the import path
import { CreateUserDto } from './dto/CreateUser.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserSettings } from '../schemas/UserSettings.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettings>,
  ) {}

  async CreateUser({ setting, ...CreateUserDto }: CreateUserDto) {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(CreateUserDto.password, 10);
    if (setting) {
      const SettingDataSave = new this.userSettingsModel(setting);
      const saveSetting = await SettingDataSave.save();

      const newUser = await new this.userModel({
        ...CreateUserDto,
        password: hashedPassword,
        setting: saveSetting?._id,
      });

      return await newUser.save();
    }

    // Create a new user document
    const newUser = await new this.userModel({
      ...CreateUserDto,
      password: hashedPassword,
      // Set the hashed password
    });

    return await newUser.save();
  }
  async verifyPassword(
    user: User,
    plainTextPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, user.password);
  }

  async getUsers() {
    return await this.userModel.find().populate('setting');
  }

  async getUserById(ID: string) {
    return await this.userModel.findById(ID).populate('setting');
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async deleteUserById(ID: string) {
    return await this.userModel.findByIdAndDelete(ID);
  }
}
