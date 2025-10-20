import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly shortDescription: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsOptional()
  @IsString()
  readonly image?: string;

  @IsOptional()
  @IsString()
  readonly multimedia?: string;

  @IsOptional()
  @IsString()
  readonly files?: string;
}
