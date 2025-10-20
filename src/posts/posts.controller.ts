import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(
    @Request() req,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createPostDto: CreatePostDto,
  ) {
    console.log('Archivos recibidos:', files);
    console.log('Datos recibidos:', createPostDto);

    return this.postsService.create(req.user._id, createPostDto);
  }

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }
}
