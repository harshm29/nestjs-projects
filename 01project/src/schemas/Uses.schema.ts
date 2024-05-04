import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserSettings } from './UserSettings.schema';

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

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, enum: Gender, default: Gender.Male })
  gender: Gender;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSettings' })
  setting?: UserSettings;
}

export const UserSchema = SchemaFactory.createForClass(User);
