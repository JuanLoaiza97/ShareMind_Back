import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private readonly postModel: Model<Post>) {}

  async create(userId: string, createPostDto: CreatePostDto): Promise<Post> {
    const post = new this.postModel({
      ...createPostDto,
      author: new Types.ObjectId(userId),
    });
    return await post.save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().populate('author', 'name email avatar').sort({ createdAt: -1 }).exec();
  }

  async findByUser(userId: string): Promise<Post[]> {
    return this.postModel
      .find({ author: new Types.ObjectId(userId) })
      .populate('author', 'name email avatar')
      .sort({ createdAt: -1 })
      .exec();
  }

  async delete(postId: string, userId: string): Promise<{ message: string }> {
    const result = await this.postModel.deleteOne({
      _id: new Types.ObjectId(postId),
      author: new Types.ObjectId(userId),
    });

    if (result.deletedCount === 0) {
      throw new Error('No autorizado o post no encontrado');
    }

    return { message: 'Post eliminado correctamente' };
  }
}
