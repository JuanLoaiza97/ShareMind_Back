import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Types } from 'mongoose';

@Schema()
export class Post extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  shortDescription: string; // pequeña leyenda

  @Prop({ required: true })
  content: string; // contenido principal del post

  @Prop()
  image?: string;

  @Prop()
  multimedia?: string;

  @Prop()
  files?: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  author: User;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
