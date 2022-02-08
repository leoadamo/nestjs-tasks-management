import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}
  // getAllTasks(): ITask[] {
  //   return this.tasks;
  // }
  // getTasksByFilter(getTasksFilterDto: GetTasksFilterDto): ITask[] {
  //   const { status, search }: GetTasksFilterDto = getTasksFilterDto;
  //   let tasks: ITask[] = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = this.tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.getTaskById(id);

    if (!found) {
      throw new NotFoundException(
        `The task with the passed ID '${id}' was not founded.`,
      );
    }

    return found;
  }

  // deleteTask(id: string): void {
  //   const foundedTask: ITask = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== foundedTask.id);
  // }
  // updateTask(id: string, status: TaskStatus): ITask {
  //   const foundedTask: ITask = this.getTaskById(id);
  //   foundedTask.status = status;
  //   return foundedTask;
  // }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }
}
