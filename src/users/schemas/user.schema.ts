import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  country: string;

  @Prop({ type: [String], default: [] })
  languages?: string[];

  @Prop({ type: [String], default: [] })
  interests?: string[];

  @Prop()
  bio: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
