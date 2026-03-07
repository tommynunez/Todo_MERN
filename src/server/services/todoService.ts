import { SeverityLevel } from 'mongodb';
import { Types } from 'mongoose';
import { TodoRepository } from '../repositories/todoRepository';
import { ITodo, ITodoService, ITodoUpdate } from '../interfaces/todoInterface';
import ChoreListService from './choreListService';
import { AuditlogService } from './appliactionLogService';
import UserService from './userService';
import { IAuditLogMessage } from '../interfaces/auditLogInterface';

export default class TodoService implements ITodoService {
  constructor(
    private todoRepository: TodoRepository,
    private choreListService: ChoreListService,
    private useraccountService: UserService,
    private auditLogService: AuditlogService,
  ) {}

  // #region Public Methods
  /**
   * Creates a new todo item for a specified chorelist
   * @param ownerId - The unique identifier of the todo owner/user
   * @param emailAddress - Email address of the user creating the todo
   * @param name - The title or name of the todo item
   * @param choreListId - The unique identifier of the chorelist this todo belongs to
   * @returns Promise resolving to the created Document if successful, false otherwise
   * @throws Will not throw but returns false if chorelist is not found or user doesn't exist
   */
  insertTodoAsync = async (
    ownerId: string,
    emailAddress: string,
    name: string,
    choreListId: string,
  ): Promise<Document | boolean> => {
    try {
      const choreList = await this.choreListService.getByIdDocumentsAsync(
        choreListId,
        ownerId,
      );

      if (!choreList) {
        /* this.auditLogService.warn({
          severity: SeverityLevel.WARNING,
          message:
            "The chore list doesn't exist, request could not be completed.",
        }); */
        return false;
      }

      const user =
        await this.useraccountService.getUserbyEmailAddressAsync(emailAddress);

      if (user) {
        const userId = user._id;
        await this.todoRepository.insertTodoAsync({
          userId,
          name,
          choreListId: new Types.ObjectId(choreListId),
        });
      }

      this.auditLogService.log({
        message: `User ${user?._id.toString()}`,
        severity: SeverityLevel.INFORMATIONAL,
      } as IAuditLogMessage);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  /**
   * Updates an existing todo item's completion status
   * @param name - The name/title of the todo to update
   * @param emailAddress - Email address of the user updating the todo
   * @param completed - Boolean indicating if the todo is completed
   * @returns Promise resolving to the updated Document or boolean status
   * @throws Will not throw but returns false if todo is not found
   */
  updateTodoAsync = async (
    name: string,
    emailAddress: string,
    completed: boolean,
  ): Promise<Document | boolean> =>
    await this.todoRepository.updateTodoAsync({
      name,
      emailAddress,
      completed,
    } as ITodoUpdate);

  /**
   * Deletes a todo item by its unique identifier
   * @param id - The unique identifier of the todo to delete
   * @returns Promise resolving to true if deletion was successful, false otherwise
   * @throws Will not throw but returns false if todo is not found
   */
  deleteTodoAsync = async (id: string): Promise<boolean> =>
    await this.todoRepository.deleteTodoAsync(id);

  /**
   * Retrieves a specific todo item by its unique identifier
   * @param id - The unique identifier of the todo to retrieve (optional)
   * @returns Promise resolving to the ITodo object if found, null otherwise
   * @throws Will not throw but returns null if todo is not found
   */
  getByIdTodosAsync = async (id?: string): Promise<ITodo | null> =>
    await this.todoRepository.getTodobyIdAsync(id);

  /**
   * Retrieves all todo items with pagination and optional search filtering
   * @param userId - The unique identifier of the user/todo owner
   * @param search - Search term to filter todos (optional)
   * @param pageIndex - Zero-based page index for pagination
   * @param pageSize - Number of todos per page
   * @returns Promise resolving to an array of ITodo objects, null if query fails
   * @throws Will not throw but returns null on database error
   */
  getAllTodosAsync = async (
    userId: string,
    search: string,
    pageIndex: number,
    pageSize: number,
  ): Promise<Array<ITodo> | null> =>
    await this.todoRepository.getTodosAsync(
      userId,
      search,
      pageIndex,
      pageSize,
    );
  // #endregion
}
