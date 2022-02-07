import { uid } from 'uid/single';

import { Injectable, NotFoundException } from '@nestjs/common';
import { ITask, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getAllTasks(): ITask[] {
    return this.tasks;
  }

  getTasksByFilter(getTasksFilterDto: GetTasksFilterDto): ITask[] {
    const { status, search }: GetTasksFilterDto = getTasksFilterDto;

    let tasks: ITask[] = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = this.tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }

        return false;
      });
    }

    return tasks;
  }

  getTaskById(id: string): ITask {
    const task: ITask = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(
        `The task with the passed ID '${id}' was not founded.`,
      );
    }

    return task;
  }

  deleteTask(id: string): void {
    const foundedTask: ITask = this.getTaskById(id);

    this.tasks = this.tasks.filter((task) => task.id !== foundedTask.id);
  }

  updateTask(id: string, status: TaskStatus): ITask {
    const foundedTask: ITask = this.getTaskById(id);

    foundedTask.status = status;

    return foundedTask;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<ITask> {
    const { title, description } = createTaskDto;

    const task: ITask = {
      id: uid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
