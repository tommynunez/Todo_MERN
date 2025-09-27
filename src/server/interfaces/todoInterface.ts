import mongoose from 'mongoose';

export interface ITodo extends mongoose.Document {
	name: string;
	completed: boolean;
	completedDate: Date;
}

export interface ITodoAdd {
	name: string;
}

export interface ITodoUpdate {
	name: string;
	completed: boolean;
}

export interface ITodoService {
	insertDocumentAsync: (name: string) => Promise<boolean>;
	updateDocumentAsync: (name: string, completed: boolean) => Promise<boolean>;
	deleteDocumentAsync: (id: number) => Promise<boolean>;
	getByIdDocumentsAsync: (name: string) => Promise<ITodo | null>;
	getAllDocumentsAsync: (
		search: any,
		pageIndex: any,
		pageSize: any
	) => Promise<Array<ITodo> | null>;
}
