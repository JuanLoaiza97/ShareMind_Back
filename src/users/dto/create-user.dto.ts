import { IsString, IsEmail, MinLength, IsArray, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  fullName: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsArray()
  @IsOptional()
  languages?: string[];

  @IsArray()
  @IsOptional()
  interests?: string[];

  @IsString()
  @IsOptional()
  bio?: string;
}
