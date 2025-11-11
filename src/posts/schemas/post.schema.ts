// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, Types } from 'mongoose';

// @Schema({ timestamps: true })
// export class Post extends Document {
//   @Prop({ required: true })
//   title: string;

//   @Prop()
//   image?: string;

//   @Prop()
//   multimedia?: string;

//   @Prop()
//   file?: string;

//   @Prop({ required: true })
//   shortDescription: string;

//   @Prop({ required: true })
//   content: string;

//   @Prop({ type: Types.ObjectId, ref: 'User', required: true })
//   author: Types.ObjectId;
// }

// export const PostSchema = SchemaFactory.createForClass(Post);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  image?: string;

  @Prop()
  multimedia?: string;

  @Prop()
  file?: string;

  @Prop({ required: true })
  shortDescription: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
