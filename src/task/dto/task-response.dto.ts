import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  name: 'TaskResponseDTO',
  description:
    'Data transfer object returned in API responses for tasks. Includes all data generated and managed by the system.',
})
export class TaskResponseDTO {
  @ApiProperty({
    description: 'Unique identifier of the task generated by the system',
    example: '60c72b2f9b1d8c001c8b2f9',
    required: true,
  })
  id?: string;

  @ApiProperty({
    description: 'Title of the task',
    example: 'My task',
  })
  title: string;

  @ApiProperty({
    description: 'Detailed description of the task',
    example: 'This is a description of my task',
  })
  description?: string;

  @ApiProperty({
    description: 'Indicates whether the task is completed',
    example: false,
  })
  done: boolean;

  @ApiProperty({
    description: 'Date when the task was created (generated by the system)',
    example: '2025-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description:
      'Date when the task was last updated (generated by the system)',
    example: '2025-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
