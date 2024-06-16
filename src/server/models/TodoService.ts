import {
	deleteDocumentAsync,
	getDocumentbyIdAsync,
	getDocumentbyNameAsync,
	getDocumentsAsync,
	insertDocumentAsync,
	updateDocumentAsync,
} from './database/documents/todo';
import { ITodo, ITodoService } from './TodoInterfaces';

export default class TodoService implements ITodoService {
	constructor() {}

	insertDocumentAsync = async (name: string): Promise<boolean> => {
		return await insertDocumentAsync({ name });
	};

	updateDocumentAsync = async (
		name: string,
		completed: boolean
	): Promise<boolean> => {
		return await updateDocumentAsync({ name, completed });
	};

	deleteDocumentAsync = async (id: number): Promise<boolean> => {
		return await deleteDocumentAsync(id);
	};

	getByIdDocumentsAsync = async (id: string): Promise<ITodo | null> => {
		return await getDocumentbyIdAsync(id);
	};

	getByNameDocumentsAsync = async (name: string): Promise<ITodo | null> => {
		return await getDocumentbyNameAsync(name);
	};

	getAllDocumentsAsync = async (
		search: any,
		pageIndex: any,
		pageSize: any
	): Promise<Array<ITodo> | null> => {
		return await getDocumentsAsync(search, pageIndex, pageSize);
	};
}
