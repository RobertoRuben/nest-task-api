import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Task extends Document {
  @Prop({
    required: true,
    unique: true,
    trim: true,
  })
  title: string;

  @Prop({
    required: true,
    trim: true,
  })
  description: string;

  @Prop({
    default: false,
  })
  done: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
