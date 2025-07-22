import { Task } from '../schemas/task.schema';

export interface ITaskRepository {
  save(task: Task): Promise<Task>;
  findAll(): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  findByTitle(title: string): Promise<Task | null>;
  delete(id: string): Promise<boolean>;
}
