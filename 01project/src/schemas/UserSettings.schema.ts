import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type UserDocument = Document & UserSettings;

@Schema({ timestamps: true })
// Enable timestamps here
export class UserSettings {
  @Prop({ required: false })
  received_notification: boolean;
  @Prop({ required: false })
  received_email: boolean;
  @Prop({ required: false })
  received_sms: boolean;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
