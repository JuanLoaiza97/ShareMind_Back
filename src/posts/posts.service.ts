// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Post } from './schemas/post.schema';
// import { CreatePostDto } from './dto/create-post.dto';

// @Injectable()
// export class PostsService {
//   constructor(
//     @InjectModel(Post.name) private postModel: Model<Post>,
//   ) {}

//   async create(userId: string, createPostDto: CreatePostDto): Promise<Post> {
//     const createdPost = new this.postModel({
//       ...createPostDto,
//       author: userId,
//     });
//     return createdPost.save();
//   }

//   async findAll(): Promise<Post[]> {
//     return this.postModel
//       .find()
//       .populate('author', 'firstName lastName avatar')
//       .sort({ createdAt: -1 });
//   }

//   async findOne(id: string): Promise<Post | null> {
//     return this.postModel
//       .findById(id)
//       .populate('author', 'firstName lastName avatar');
//   }
// }
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async create(userId: string, createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel({
      ...createPostDto,
      author: userId,
    });
    return createdPost.save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel
      .find()
      .populate('author', 'firstName lastName avatar')
      .sort({ createdAt: -1 });
  }

  async findOne(id: string): Promise<Post | null> {
    return this.postModel
      .findById(id)
      .populate('author', 'firstName lastName avatar');
  }

  // 🟢 Buscar posts (para el buscador de Explore)
  async search(query: string): Promise<Post[]> {
    if (!query || query.trim() === '') {
      // Si no hay texto, devolver todo
      return this.findAll();
    }

    const regex = new RegExp(query, 'i'); // 'i' = insensible a mayúsculas/minúsculas

    return this.postModel
      .find({
        $or: [
          { title: { $regex: regex } },
          { shortDescription: { $regex: regex } },
          { content: { $regex: regex } },
        ],
      })
      .populate('author', 'firstName lastName avatar')
      .sort({ createdAt: -1 })
      .exec();
  }
}
