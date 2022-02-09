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
    const found: Task = await this.tasksRepository.getTaskById(id);

    if (!found) {
      throw new NotFoundException(
        `The task with the passed ID '${id}' was not founded.`,
      );
    }

    return found;
  }

  async deleteTask(id: string): Promise<void> {
    const { affected } = await this.tasksRepository.deleteTask(id);

    if (affected === 0) {
      throw new NotFoundException(
        `The task with the passed ID '${id}' doesn't exists in the database.`,
      );
    }
  }

  async updateTask(id: string, status: TaskStatus): Promise<Task> {
    const task: Task = await this.getTaskById(id);

    const updatedTask: Task = await this.tasksRepository.updateTask(
      task,
      status,
    );

    return updatedTask;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }
}
