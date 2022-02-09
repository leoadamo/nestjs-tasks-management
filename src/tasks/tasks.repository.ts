import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  // Creating a new task
  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);

    return task;
  }

  // Getting a task by ID
  async getTaskById(id: string): Promise<Task> {
    const found = await this.findOne(id);

    return found;
  }

  // Deleting a task
  async deleteTask(id: string): Promise<DeleteResult> {
    const result: DeleteResult = await this.delete(id);

    return result;
  }

  // Updating a task
  async updateTask(task: Task, status: TaskStatus): Promise<Task> {
    const data: Task = task;

    data.status = status;
    await this.save(data);

    return data;
  }
}
