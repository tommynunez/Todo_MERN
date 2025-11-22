import { TodoRepository } from "../repositories/todoRepository";
import { ITodo, ITodoService, ITodoUpdate } from "../interfaces/todoInterface";
import ChoreListService from "./choreListService";
import { AuditlogService } from "./appliactionLogService";
import UserService from "./userService";
import { IAuditLogMessage } from "../interfaces/auditLogInterface";
import { SeverityLevel } from "mongodb";
import { Types } from "mongoose";

export default class TodoService implements ITodoService {
  constructor(
    private todoRepository: TodoRepository,
    private choreListService: ChoreListService,
    private useraccountService: UserService,
    private auditLogService: AuditlogService
  ) {}

  /**
   * Create a new todo Todo
   * @param name
   * @returns boolean
   */
  insertTodoAsync = async (
    ownerId: string,
    emailAddress: string,
    name: string,
    choreListId: string
  ): Promise<Document | boolean> => {
    try {
      const choreList = await this.choreListService.getByIdDocumentsAsync(
        choreListId,
        ownerId
      );

      if (!choreList) {
        /*this.auditLogService.warn({
          severity: SeverityLevel.WARNING,
          message:
            "The chore list doesn't exist, request could not be completed.",
        });*/
        return false;
      }

      const user = await this.useraccountService.getUserbyEmailAddressAsync(
        emailAddress
      );

      if (user) {
        const userId = user.id;
        await this.todoRepository.insertTodoAsync({
          userId,
          name,
          choreListId: new Types.ObjectId(choreListId),
        });
      }

      this.auditLogService.log({
        message: `User ${user?.id.toString()}`,
        severity: SeverityLevel.INFORMATIONAL,
      } as IAuditLogMessage);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  /**
   * Update a todo Todo
   * @param name
   * @param completed
   * @returns
   */
  updateTodoAsync = async (
    name: string,
    emailAddress: string,
    completed: boolean
  ): Promise<Document | boolean> =>
    await this.todoRepository.updateTodoAsync({
      name,
      emailAddress,
      completed,
    } as ITodoUpdate);

  /**
   * Delete a todo Todo
   * @param id
   * @returns
   */
  deleteTodoAsync = async (id: number): Promise<boolean> =>
    await this.todoRepository.deleteTodoAsync(id);

  /**
   * Get a todo Todo by id
   * @param id
   * @returns
   */
  getByIdTodosAsync = async (id?: string): Promise<ITodo | null> =>
    await this.todoRepository.getTodobyIdAsync(id);

  /**
   * Get all todo Todos with pagination
   * @param search
   * @param pageIndex
   * @param pageSize
   * @returns
   */
  getAllTodosAsync = async (
    search: any,
    pageIndex: any,
    pageSize: any
  ): Promise<Array<ITodo> | null> =>
    await this.todoRepository.getTodosAsync(search, pageIndex, pageSize);
}
