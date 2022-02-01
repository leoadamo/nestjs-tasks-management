import { TaskStatus } from '../task.model';

export class GetTasksByFilterDto {
  status: TaskStatus;
  search: string;
}
