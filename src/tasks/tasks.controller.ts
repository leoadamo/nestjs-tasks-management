import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getTasks(@Query() getTasksFilterDto: GetTasksFilterDto): ITask[] {
  //   if (Object.keys(getTasksFilterDto).length) {
  //     return this.tasksService.getTasksByFilter(getTasksFilterDto);
  //   }

  //   return this.tasksService.getAllTasks();
  // }

  @Get(':id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @HttpCode(201)
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  // @Delete(':id')
  // @HttpCode(204)
  // deleteTask(@Param('id') id: string): void {
  //   return this.tasksService.deleteTask(id);
  // }

  // @Patch(':id/status')
  // updateTask(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  // ): ITask {
  //   const { status } = updateTaskStatusDto;
  //   return this.tasksService.updateTask(id, status);
  // }
}
