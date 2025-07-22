import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TaskRequestDTO {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @IsBoolean({ message: 'Done must be a boolean' })
  @IsOptional()
  done?: boolean;
}
