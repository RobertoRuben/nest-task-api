import { Module } from '@nestjs/common';
import { TaskService } from './service/impl/task.service';
import { TaskRepository } from './repository/impl/task.repository';
import { TaskController } from './controller/task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Task.name,
        schema: TaskSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: 'ITaskService',
      useClass: TaskService,
    },
    {
      provide: 'ITaskRepository',
      useClass: TaskRepository,
    },
  ],
  exports: ['ITaskService'],
  controllers: [TaskController],
})
export class TaskModule {}
