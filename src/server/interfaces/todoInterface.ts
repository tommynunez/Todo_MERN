import mongoose, { Types } from "mongoose";
import { IService } from "./service";

export interface ITodo extends mongoose.Document {
  choreListId: Types.ObjectId;
  name: string;
  completed: boolean;
  completedDate: Date;
}

export interface ITodoAdd {
  name: string;
  choreListId: Types.ObjectId;
}

export interface ITodoUpdate {
  name: string;
  completed: boolean;
}

export interface ITodoService extends IService {
  insertTodoAsync: (
    name: string,
    choreList: Types.ObjectId
  ) => Promise<boolean>;
  updateTodoAsync: (name: string, completed: boolean) => Promise<boolean>;
  deleteTodoAsync: (id: number) => Promise<boolean>;
  getByIdTodosAsync: (name: string) => Promise<ITodo | null>;
  getAllTodosAsync: (
    search: any,
    pageIndex: any,
    pageSize: any
  ) => Promise<Array<ITodo> | null>;
}
