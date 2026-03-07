import { Types } from 'mongoose';
import { ITodo, ITodoAdd, ITodoUpdate } from '../interfaces/todoInterface';
import { todoModel } from '../models/todoModel';

export class TodoRepository {
  constructor() {}

  /**
   * Creates and inserts a new todo document into the database
   * @param userId - The ObjectId of the user who owns this todo
   * @param name - The title/name of the todo item
   * @param choreListId - The ObjectId of the chorelist this todo belongs to
   * @returns Promise resolving to the created Document if successful, false otherwise
   * @throws Will not throw but returns false if database error occurs
   * @async
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
        name,
      });

      return await todo.save();
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  /**
   * Updates a todo item's completion status and metadata
   * @param emailAddress - Email of the user completing the todo
   * @param name - The name of the todo to update
   * @param completed - Boolean indicating completion status
   * @returns Promise resolving to true if update successful, false otherwise
   * @throws Will not throw but returns false if database error occurs
   * @async
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
        },
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  /**
   * Deletes a todo item from the database by its ID
   * @param id - The unique ObjectId of the todo to delete
   * @returns Promise resolving to true if deletion successful, false if not found or error
   * @throws Will not throw but returns false if database error occurs
   * @async
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
   * Retrieves a single todo item by its unique identifier
   * @param id - The unique ObjectId of the todo to retrieve (optional)
   * @returns Promise resolving to the ITodo object if found, null otherwise
   * @throws Will not throw but returns null if database error occurs
   * @async
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
    pageSize: number,
  ): Promise<Array<ITodo> | null> => {
    try {
      pageSize = pageSize ?? 0;
      pageIndex = pageIndex ?? 10;

      const response = (await todoModel
        .find({
          userId,
          $or: [
            {
              _id: Types.ObjectId.isValid(search)
                ? new Types.ObjectId(search)
                : undefined,
            },
            { title: { $regex: search, $options: 'i' } },
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
