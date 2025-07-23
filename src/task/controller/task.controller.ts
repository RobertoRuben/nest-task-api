import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ITaskService } from '../service/task-service.interface';
import { TaskRequestDTO } from '../dto/task-request.dto';
import { TaskResponseDTO } from '../dto/task-response.dto';

@Controller('tasks')
export class TaskController {
  constructor(
    @Inject('ITaskService')
    private readonly taskService: ITaskService,
  ) {}

  @Post()
  async createTask(
    @Body() taskRequestDTO: TaskRequestDTO,
  ): Promise<TaskResponseDTO> {
    return await this.taskService.createTask(taskRequestDTO);
  }

  @Get()
  async getAllTasks(): Promise<TaskResponseDTO[]> {
    return await this.taskService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<TaskResponseDTO | null> {
    return await this.taskService.getTaskById(id);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() taskRequestDTO: TaskRequestDTO,
  ): Promise<TaskResponseDTO | null> {
    return await this.taskService.updateTask(id, taskRequestDTO);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTask(@Param('id') id: string): Promise<boolean> {
    return await this.taskService.deleteTask(id);
  }
}
