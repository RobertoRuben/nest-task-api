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
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';

@Controller('tasks')
@ApiTags('Tasks')
export class TaskController {
  constructor(
    @Inject('ITaskService')
    private readonly taskService: ITaskService,
  ) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'The task has been successfully created.',
    type: TaskResponseDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: 409,
    description: 'A task with that title already exists',
  })
  @ApiBody({
    type: TaskRequestDTO,
  })
  async createTask(
    @Body() taskRequestDTO: TaskRequestDTO,
  ): Promise<TaskResponseDTO> {
    return await this.taskService.createTask(taskRequestDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'List of all tasks',
    type: TaskResponseDTO,
    isArray: true,
  })
  async getAllTasks(): Promise<TaskResponseDTO[]> {
    return await this.taskService.getAllTasks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiParam({
    name: 'id',
    description: 'Task unique identifier',
    example: '60c72b2f9b1d8c001c8b2f9',
  })
  @ApiResponse({
    status: 200,
    description: 'Task found',
    type: TaskResponseDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async getTaskById(@Param('id') id: string): Promise<TaskResponseDTO | null> {
    return await this.taskService.getTaskById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiParam({
    name: 'id',
    description: 'Task unique identifier',
    example: '60c72b2f9b1d8c001c8b2f9',
  })
  @ApiBody({
    type: TaskRequestDTO,
  })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
    type: TaskResponseDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  @ApiResponse({
    status: 409,
    description: 'A task with that title already exists',
  })
  async updateTask(
    @Param('id') id: string,
    @Body() taskRequestDTO: TaskRequestDTO,
  ): Promise<TaskResponseDTO | null> {
    return await this.taskService.updateTask(id, taskRequestDTO);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiParam({
    name: 'id',
    description: 'Task unique identifier',
    example: '60c72b2f9b1d8c001c8b2f9',
  })
  @ApiResponse({
    status: 204,
    description: 'Task deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async deleteTask(@Param('id') id: string): Promise<boolean> {
    return await this.taskService.deleteTask(id);
  }
}
