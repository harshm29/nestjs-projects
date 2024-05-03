import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

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
}
