import { SharedService } from './../shared/shared.service';
import { Response } from 'express';
import { todoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';
import { Controller, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
@UsePipes(new ValidationPipe({ transform: true }))
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly sservice: SharedService,
  ) {}

  @MessagePattern('create')
  async createTask(@Payload() data: todoDto, @Res() res: Response) {
    try {
      return await this.todoService.createTask(data);
    } catch (err) {
      const { code, response } = await this.sservice.processError(
        err,
        this.constructor.name,
      );
      return res.status(code).json(response);
    }
  }
  @MessagePattern('task-list')
  async getTaskList(@Payload() body: any, @Res() res: Response) {
    try {
      return await this.todoService.taskList();
    } catch (err) {
      const { code, response } = await this.sservice.processError(
        err,
        this.constructor.name,
      );
      return res.status(code).json(response);
    }
  }

  @MessagePattern('task-detail')
  async getTaskDetail(@Payload() body: any, @Res() res: Response) {
    try {
      return await this.todoService.taskDetail(body.id);
    } catch (err) {
      const { code, response } = await this.sservice.processError(
        err,
        this.constructor.name,
      );
      return res.status(code).json(response);
    }
  }

  @MessagePattern('update-task')
  async updateTask(@Payload() body: any, @Res() res: Response) {
    try {
      return await this.todoService.taskUpdate(body);
    } catch (err) {
      const { code, response } = await this.sservice.processError(
        err,
        this.constructor.name,
      );
      return res.status(code).json(response);
    }
  }

  @MessagePattern('update-task-status')
  async updateStatus(@Payload() body: any, @Res() res: Response) {
    try {
      return await this.todoService.updateTaskStatus(body);
    } catch (err) {
      const { code, response } = await this.sservice.processError(
        err,
        this.constructor.name,
      );
      return res.status(code).json(response);
    }
  }

  @MessagePattern('delete-task')
  async deleteTask(@Payload() body: any, @Res() res: Response) {
    try {
      return await this.todoService.taskDelete(body);
    } catch (err) {
      const { code, response } = await this.sservice.processError(
        err,
        this.constructor.name,
      );
      return res.status(code).json(response);
    }
  }
}
