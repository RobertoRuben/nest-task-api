import {
  Inject,
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { ITaskService } from '../task-service.interface';
import { ITaskRepository } from 'src/task/repository/task-repository.interface';
import { TaskRequestDTO } from 'src/task/dto/task-request.dto';
import { TaskResponseDTO } from 'src/task/dto/task-response.dto';
import { Task } from 'src/task/schemas/task.schema';

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    @Inject('ITaskRepository') private readonly taskRepository: ITaskRepository,
  ) {}

  async createTask(taskRequest: TaskRequestDTO): Promise<TaskResponseDTO> {
    const existing = await this.taskRepository.findByTitle?.(taskRequest.title);
    if (existing) {
      throw new ConflictException('Ya existe una tarea con ese título');
    }

    const task = new Task();
    task.title = taskRequest.title;
    task.description = taskRequest.description ?? '';
    task.done = taskRequest.done ?? false;

    const savedTask = await this.taskRepository.save(task);
    return {
      id: savedTask._id?.toString(),
      title: savedTask.title,
      description: savedTask.description,
      done: savedTask.done,
      createdAt: savedTask.createdAt ?? new Date(),
      updatedAt: savedTask.updatedAt ?? new Date(),
    };
  }

  async getAllTasks(): Promise<TaskResponseDTO[]> {
    const tasks = await this.taskRepository.findAll();
    return tasks.map((tasks) => ({
      id: tasks._id?.toString(),
      title: tasks.title,
      description: tasks.description,
      done: tasks.done,
      createdAt: tasks.createdAt ?? new Date(),
      updatedAt: tasks.updatedAt ?? new Date(),
    }));
  }

  async getTaskById(id: string): Promise<TaskResponseDTO | null> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException('Tarea no encontrada');
    }
    return {
      id: task._id?.toString(),
      title: task.title,
      description: task.description,
      done: task.done,
      createdAt: task.createdAt ?? new Date(),
      updatedAt: task.updatedAt ?? new Date(),
    };
  }

  async updateTask(
    id: string,
    taskRequest: TaskRequestDTO,
  ): Promise<TaskResponseDTO | null> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException('Tarea no encontrada');
    }

    const existing = await this.taskRepository.findByTitle?.(taskRequest.title);
    if (existing && existing._id?.toString() !== id) {
      throw new ConflictException('Ya existe una tarea con ese título');
    }

    task.title = taskRequest.title;
    task.description = taskRequest.description ?? '';
    task.done = taskRequest.done ?? false;

    const updatedTask = await this.taskRepository.save(task);
    return {
      id: updatedTask._id?.toString(),
      title: updatedTask.title,
      description: updatedTask.description,
      done: updatedTask.done,
      createdAt: updatedTask.createdAt ?? new Date(),
      updatedAt: updatedTask.updatedAt ?? new Date(),
    };
  }

  async deleteTask(id: string): Promise<boolean> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException('Tarea no encontrada');
    }
    const result = await this.taskRepository.delete(id);
    return result;
  }
}
