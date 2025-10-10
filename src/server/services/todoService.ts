import {
	deleteDocumentAsync,
	getDocumentbyIdAsync,
	getDocumentsAsync,
	insertDocumentAsync,
	updateDocumentAsync,
} from '../models/todoModel';
import { ITodo, ITodoService } from '../interfaces/todoInterface';

export default class TodoService implements ITodoService {
	constructor() {}

	insertDocumentAsync = async (name: string): Promise<boolean> => await insertDocumentAsync({ name });

	updateDocumentAsync = async (
		name: string,
		completed: boolean
	): Promise<boolean> => await updateDocumentAsync({ name, completed });

	deleteDocumentAsync = async (id: number): Promise<boolean> => await deleteDocumentAsync(id);

	getByIdDocumentsAsync = async (id?: string): Promise<ITodo | null> => await getDocumentbyIdAsync(id);
	
	getAllDocumentsAsync = async (
		search: any,
		pageIndex: any,
		pageSize: any
	): Promise<Array<ITodo> | null> => await getDocumentsAsync(search, pageIndex, pageSize);
}
