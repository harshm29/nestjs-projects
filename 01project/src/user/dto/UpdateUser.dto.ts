import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsNumber()
  age?: number;

  @IsString()
  gender?: string;
}
