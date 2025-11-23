import mongoose, { Types } from "mongoose";
import { IService } from "./service";

export interface IComplete extends mongoose.Document {
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

export interface ITodoUpdate {
  emailAddress: string;
  name: string;
  completed: boolean;
}

export interface ITodoService extends IService {
  insertTodoAsync: (
    ownerId: string,
    emailAddress: string,
    name: string,
    choreListId: string
  ) => Promise<Document | boolean>;
  updateTodoAsync: (
    emailAddress: string,
    name: string,
    completed: boolean
  ) => Promise<Document | boolean>;
  deleteTodoAsync: (id: number) => Promise<boolean>;
  getByIdTodosAsync: (name: string) => Promise<ITodo | null>;
  getAllTodosAsync: (
    userId: any,
    search: any,
    pageIndex: any,
    pageSize: any
  ) => Promise<Array<ITodo> | null>;
}
