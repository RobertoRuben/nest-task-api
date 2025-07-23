import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@ApiSchema({
  name: 'TaskRequestDTO',
  description: 'Data transfer object for creating or updating a task',
})
export class TaskRequestDTO {
  @ApiProperty({
    description: 'Title of the task',
    example: 'My Task',
    required: true,
    default: 'My Task',
  })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({
    description: 'Description of the task',
    example: 'This is a description of my task',
    required: false,
    default: '',
  })
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @ApiProperty({
    default: false,
    description: 'Indicates whether the task is done',
    example: false,
    required: false,
  })
  @IsBoolean({ message: 'Done must be a boolean' })
  @IsOptional()
  done?: boolean;
}
