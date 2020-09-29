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

  async getTasks(dto: GetTasksFilterDto): Promise<Task[]> {
    return await this.repo.getTasks(dto);
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.repo.findOne(id);

    if(!task) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }

    return task;
  }

  async createTask(dto: CreateTaskDto): Promise<Task> {
    return await this.repo.createTask(dto);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.repo.delete(id);

    if(result.affected === 0) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();

    return task;
  }
}
