export class TaskResponseDTO {
  id: string;
  title: string;
  description?: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}
