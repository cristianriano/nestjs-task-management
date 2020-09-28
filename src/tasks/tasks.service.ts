import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private repo: TaskRepository
  ) {}
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTasksWithFilters(dto: GetTasksFilterDto): Task[] {
  //  const {status, search} = dto;

  //  let tasks = this.getAllTasks();

  //  if(status) {
  //   tasks = tasks.filter(task => task.status === status);
  //  }

  //  if(search) {
  //    tasks = tasks.filter(task =>
  //      task.title.includes(search) ||
  //      task.description.includes(search)
  //    );
  //  }

  //  return tasks;
  // }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.repo.findOne(id);

    if(!task) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }

    return task;
  }

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const {title, description} = dto;
    const task = new Task();

    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();

    return task;
  }

  // deleteTask(id: string): void {
  //   this.tasks = this.tasks.filter(task => task.id !== id);
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
