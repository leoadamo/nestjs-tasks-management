import { uid } from 'uid/single';

import { Injectable } from '@nestjs/common';
import { ITask, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getAllTasks(): ITask[] {
    return this.tasks;
  }

  getTaskById(id: string): ITask {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTask(id: string, status: TaskStatus): ITask {
    const task: ITask = this.getTaskById(id);

    task.status = status;

    return task;
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
