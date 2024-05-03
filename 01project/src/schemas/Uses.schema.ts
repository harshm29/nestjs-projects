import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Document & User;

enum Gender {
  Male = 'M',
  Female = 'F',
  Transgender = 'T',
}

@Schema({ timestamps: true }) // Enable timestamps here
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, enum: Gender, default: Gender.Male })
  gender: Gender;
}

export const UserSchema = SchemaFactory.createForClass(User);
