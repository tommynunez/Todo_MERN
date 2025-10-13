import {
  deleteDocumentAsync,
  getDocumentbyIdAsync,
  getDocumentsAsync,
  insertDocumentAsync,
  updateDocumentAsync,
} from "../models/todoModel";
import { ITodo, ITodoService } from "../interfaces/todoInterface";

export default class TodoService implements ITodoService {
  constructor() {}

  /**
   * Create a new todo document
   * @param name
   * @returns boolean
   */
  insertDocumentAsync = async (name: string): Promise<boolean> =>
    await insertDocumentAsync({ name });

  /**
   * Update a todo document
   * @param name
   * @param completed
   * @returns
   */
  updateDocumentAsync = async (
    name: string,
    completed: boolean,
  ): Promise<boolean> => await updateDocumentAsync({ name, completed });

  /**
   * Delete a todo document
   * @param id
   * @returns
   */
  deleteDocumentAsync = async (id: number): Promise<boolean> =>
    await deleteDocumentAsync(id);

  /**
   * Get a todo document by id
   * @param id
   * @returns
   */
  getByIdDocumentsAsync = async (id?: string): Promise<ITodo | null> =>
    await getDocumentbyIdAsync(id);

  /**
   * Get all todo documents with pagination
   * @param search
   * @param pageIndex
   * @param pageSize
   * @returns
   */
  getAllDocumentsAsync = async (
    search: any,
    pageIndex: any,
    pageSize: any,
  ): Promise<Array<ITodo> | null> =>
    await getDocumentsAsync(search, pageIndex, pageSize);
}
