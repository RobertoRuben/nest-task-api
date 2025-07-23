import { TaskRequestDTO } from '../dto/task-request.dto';
import { TaskResponseDTO } from '../dto/task-response.dto';

export interface ITaskService {
  createTask(taskRequest: TaskRequestDTO): Promise<TaskResponseDTO>;
  getAllTasks(): Promise<TaskResponseDTO[]>;
  getTaskById(id: string): Promise<TaskResponseDTO | null>;
  updateTask(
    id: string,
    taskRequest: TaskRequestDTO,
  ): Promise<TaskResponseDTO | null>;
  deleteTask(id: string): Promise<boolean>;
}
