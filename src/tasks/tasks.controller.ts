import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { ITask, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): ITask[] {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): ITask {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @HttpCode(201)
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<ITask> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }

  @Patch(':id/status')
  updateTask(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): ITask {
    return this.tasksService.updateTask(id, status);
  }
}
