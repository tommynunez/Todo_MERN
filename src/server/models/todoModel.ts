import mongoose, { Schema, model } from "mongoose";
import { ITodo, ITodoAdd, ITodoUpdate } from "../interfaces/todoInterface";

const todoSchema = new Schema<ITodo>({
  name: { type: String, required: true, unique: false },
  completed: { type: Boolean, required: true },
  completedDate: { type: Date, required: false },
});

export const todoModel = model<ITodo>("Todo", todoSchema);

export class TodoRepository {
  constructor() {}

  /**
   * Create a new todo Todo
   * @param param0
   * @returns
   */
  insertTodoAsync = async ({ name }: ITodoAdd): Promise<boolean> => {
    try {
      const todo = new todoModel({
        name: name,
        completed: false,
        completedDate: null,
      });

      await todo.save();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  /**
   * Update a todo Todo
   * @param param0
   * @returns
   */
  updateTodoAsync = async ({
    name,
    completed,
  }: ITodoUpdate): Promise<boolean> => {
    try {
      await todoModel.findOneAndUpdate(
        { name },
        {
          completed,
          completedDate: completed ? new Date() : null,
        }
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  /**
   * Delete a todo Todo
   * @param id
   * @returns
   */
  deleteTodoAsync = async (id: number): Promise<boolean> => {
    const db = await mongoose.connect(process.env.NODE_MONGO_DB_URL);
    try {
      await todoModel.findOneAndDelete({ id });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  /**
   * Get a todo Todo by id
   * @param id
   * @returns
   */
  getTodobyIdAsync = async (id?: string): Promise<ITodo | null> => {
    try {
      const response = await todoModel.findById(id);
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  /**
   * Get all todo Todos with pagination
   * @param search
   * @param pageIndex
   * @param pageSize
   * @return Array<ITodo> | null
   */
  getTodosAsync = async (
    search: string,
    pageIndex: number,
    pageSize: number
  ): Promise<Array<ITodo> | null> => {
    try {
      pageSize = pageSize ?? 0;
      pageIndex = pageIndex ?? 10;

      const response = await todoModel
        .find(search ? { name: search } : {})
        .limit(pageSize)
        .skip(pageIndex * pageSize)
        .exec();

      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}
