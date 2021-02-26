import * as mongoose from 'mongoose';

export interface todoInterface extends mongoose.Document {
  title: string;
  description: string;
  date: Date;
  status: string;
}

export const todoSchema = new mongoose.Schema(
  {
    title: { type: 'String' },
    description: { type: 'String' },
    date: { type: Date, default: Date.now },
    status: {
      type: 'String',
      default: 'Pending',
      example: 'Pending/completed',
    },
  },
  {
    collection: 'todoList',
    timestamps: true,
  },
);
