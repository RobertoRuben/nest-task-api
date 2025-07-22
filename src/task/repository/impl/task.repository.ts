import { InjectModel } from '@nestjs/mongoose';
import { ITaskRepository } from '../task-repository.interface';
import { Task } from 'src/task/schemas/task.schema';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  async save(task: Task): Promise<Task> {
    const newTask = new this.taskModel(task);
    return await newTask.save();
  }

  async findAll(): Promise<Task[]> {
    return await this.taskModel.find().exec();
  }

  async findById(id: string): Promise<Task | null> {
    return await this.taskModel.findById(id).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.taskModel.deleteOne({ _id: id }).exec();
    return result.deletedCount === 1;
  }
}
