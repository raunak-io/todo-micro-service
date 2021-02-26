import { SharedModule } from './../shared/shared.module';
import { todoSchema } from './schema/todo.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'todomicro', schema: todoSchema }]),
    SharedModule,
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
