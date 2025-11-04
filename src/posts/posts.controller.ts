import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  Request,
  UploadedFiles,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 🟢 Crear un nuevo post
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

  // 🟢 Obtener todos los posts
  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  // 🟢 Obtener un post específico por ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new NotFoundException(`Post con id ${id} no encontrado`);
    }
    return post;
  }
}
