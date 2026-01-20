import { Types } from "mongoose";
import { ITodo, ITodoAdd, ITodoUpdate } from "../interfaces/todoInterface";
import { todoModel } from "../models/todoModel";

export class TodoRepository {
  constructor() {}

  /**
   * Create a new todo Todo
   * @param param0
   * @returns
   */
  insertTodoAsync = async ({
    userId,
    name,
    choreListId,
  }: ITodoAdd): Promise<Document | boolean> => {
    try {
      const todo = new todoModel({
        userId: new Types.ObjectId(userId),
        choreListId: new Types.ObjectId(choreListId),
        name: name,
      });

      return await todo.save();
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
    emailAddress,
    name,
    completed,
  }: ITodoUpdate): Promise<Document | boolean> => {
    try {
      await todoModel.findOneAndUpdate(
        { name },
        {
          complete: {
            by: emailAddress,
            completed,
            completedDate: completed ? new Date() : null,
          },
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
    try {
      const result = await todoModel.findOneAndDelete({
        _id: new Types.ObjectId(id),
      });
      if (result) {
        return true;
      }

      return false;
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
   * @param userId
   * @param search
   * @param pageIndex
   * @param pageSize
   * @return Array<ITodo> | null
   */
  getTodosAsync = async (
    userId: string,
    search: string,
    pageIndex: number,
    pageSize: number
  ): Promise<Array<ITodo> | null> => {
    try {
      pageSize = pageSize ?? 0;
      pageIndex = pageIndex ?? 10;

      const response =
        (await todoModel
          .find({
            userId: userId,
            $or: [
              {
                _id: Types.ObjectId.isValid(search)
                  ? new Types.ObjectId(search)
                  : undefined,
              },
              { title: { $regex: search, $options: "i" } },
            ],
          })
          .skip((pageIndex ?? 0) * (pageSize ?? 10))
          .limit(pageSize ?? 10)
          .exec()) || [];

      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}
