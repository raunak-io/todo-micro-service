import { todoDto } from './dto/todo.dto';
import { todoInterface } from './schema/todo.schema';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel('todomicro')
    private readonly todoModel: Model<todoInterface>,
  ) {}

  async createTask(body: todoDto) {
    try {
      let data = await this.todoModel.create(body);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async taskDetail(id: string) {
    try {
      let data = await this.todoModel
        .findOne({ _id: id })
        .select({ title: 1, description: 1, date: 1, status: 1 });
      return data;
    } catch (err) {
      throw err;
    }
  }

  async taskList() {
    try {
      let data = await this.todoModel
        .find()
        .select({ title: 1, description: 1, date: 1, status: 1 });
      return data;
    } catch (err) {
      throw err;
    }
  }

  async taskUpdate(body: any) {
    try {
      let fv = {
        title: body.title,
        description: body.description,
        date: body.date,
      };
      let data = await this.todoModel
        .findOneAndUpdate({ _id: body.id }, fv, {
          new: true,
        })
        .select({ title: 1, description: 1, date: 1, status: 1 });
      return data;
    } catch (err) {
      throw err;
    }
  }

  async updateTaskStatus(body) {
    try {
      let data = await this.todoModel.findOneAndUpdate(
        { _id: body.id },
        { status: body.status },
        { new: true },
      );
      return data;
    } catch (err) {
      throw err;
    }
  }

  async taskDelete(body) {
    try {
      await this.todoModel.deleteOne({
        _id: body.id,
      });
      return { message: 'data deleted successfully' };
    } catch (err) {
      throw err;
    }
  }
}
