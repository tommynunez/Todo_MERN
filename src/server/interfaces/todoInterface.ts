import mongoose, { Types } from 'mongoose';
import { IService } from './service';

export interface IComplete {
  by: string;
  isCompleted: boolean;
  completedDate: Date;
}

export interface ITodo extends mongoose.Document {
  userId: Types.ObjectId;
  choreListId: Types.ObjectId;
  name: string;
  complete: [IComplete];
}

export interface ITodoAdd {
  userId: Types.ObjectId;
  name: string;
  choreListId: Types.ObjectId;
}

export interface ITodoAddRequest {
  userId: string;
  name: string;
  choreListId: string;
}

export interface ITodoUpdateRequest {
  emailAddress: string;
  name: string;
  completed: boolean;
}

export interface ITodoService extends IService {
  insertTodoAsync: (
    ownerId: string,
    emailAddress: string,
    name: string,
    choreListId: string,
  ) => Promise<boolean>;
  updateTodoAsync: (
    emailAddress: string,
    name: string,
    completed: boolean,
  ) => Promise<boolean>;
  deleteTodoAsync: (id: string) => Promise<boolean>;
  getByIdTodosAsync: (id: string) => Promise<ITodo | null>;
  getAllTodosAsync: (
    userId: string,
    search: string,
    pageIndex: number,
    pageSize: number,
  ) => Promise<Array<ITodo> | null>;
}
