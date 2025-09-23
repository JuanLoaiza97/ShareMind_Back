import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  country: string;

  @Prop([String])
  languages: string[];

  @Prop([String])
  interests: string[];

  @Prop()
  bio: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
