import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
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
  async create(@Request() req, @UploadedFiles() files: Express.Multer.File[], @Body() createPostDto: CreatePostDto) {
    console.log('📦 Archivos recibidos:', files);
    console.log('📝 Datos recibidos:', createPostDto);

    const newPost = await this.postsService.create(req.user._id, createPostDto);
    return {
      message: '✅ Publicación creada con éxito',
      post: newPost,
    };
  }

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Get('user/:id')
  async findByUser(@Param('id') id: string) {
    return this.postsService.findByUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req) {
    return this.postsService.delete(id, req.user._id);
  }
}
