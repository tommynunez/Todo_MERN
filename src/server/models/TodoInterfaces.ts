import mongoose from "mongoose";
import {
	DeleteFunction,
	GetAllFunction,
	GetByIdFunction,
	InsertFunction,
	UpdateFunction,
} from "./TodoTypes";

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
	insertDocumentAsync: InsertFunction;
	updateDocumentAsync: UpdateFunction;
	deleteDocumentAsync: DeleteFunction;
	getByIdDocumentsAsync: GetByIdFunction;
	getByNameDocumentsAsync: GetByIdFunction;
	getAllDocumentsAsync: GetAllFunction;
}
