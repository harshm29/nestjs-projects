import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  ValidateNested,
} from 'class-validator';

export class CreateUserSettingDto {
  @IsOptional()
  @IsBoolean()
  received_notification: string;

  @IsOptional()
  @IsBoolean()
  received_email: boolean;

  @IsOptional()
  @IsBoolean()
  received_sms: boolean;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  password: string; // Add the password field

  @IsNotEmpty()
  email: string; // Add the email field

  @IsNotEmpty()
  gender?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateUserSettingDto)
  setting?: CreateUserSettingDto;
}
