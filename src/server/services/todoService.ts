import { TodoRepository } from "../repositories/todoRepository";
import { ITodo, ITodoService } from "../interfaces/todoInterface";

export default class TodoService implements ITodoService {
  constructor(private todoRepository: TodoRepository) {}

  /**
   * Create a new todo Todo
   * @param name
   * @returns boolean
   */
  insertTodoAsync = async (name: string): Promise<boolean> =>
    await this.todoRepository.insertTodoAsync({ name });

  /**
   * Update a todo Todo
   * @param name
   * @param completed
   * @returns
   */
  updateTodoAsync = async (
    name: string,
    completed: boolean
  ): Promise<boolean> =>
    await this.todoRepository.updateTodoAsync({ name, completed });

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
