import mongoose, { Schema, model } from 'mongoose';
import { ITodo, ITodoAdd, ITodoUpdate } from '../../../TodoInterfaces';

const todoSchema = new Schema<ITodo>({
	name: { type: String, required: true, unique: false },
	completed: { type: Boolean, required: true },
	completedDate: { type: Date, required: false },
});

export const todoModel = model<ITodo>('Todo', todoSchema);

export const insertDocumentAsync = async ({
	name,
}: ITodoAdd): Promise<boolean> => {
	try {
		const db = await mongoose.connect('mongodb://localhost:27017/test');
		const todo = new todoModel({
			name: name,
			completed: false,
			completedDate: null,
		});

		await todo.save();
		db.disconnect();
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const updateDocumentAsync = async ({
	name,
	completed,
}: ITodoUpdate): Promise<boolean> => {
	try {
		const db = await mongoose.connect('mongodb://localhost:27017/test');
		const todo = new todoModel({
			name,
			completed,
			completedDate: new Date(),
		});
		await todo.updateOne();
		db.disconnect();
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const deleteDocumentAsync = async (id: number): Promise<boolean> => {
	try {
		const db = await mongoose.connect('mongodb://localhost:27017/test');
		await todoModel.findOneAndDelete({ id });
		await db.disconnect();
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const getDocumentbyIdAsync = async (
	id: string
): Promise<ITodo | null> => {
	try {
		const db = await mongoose.connect('mongodb://localhost:27017/test');
		const response = await todoModel.findOne({ id });
		await db.disconnect();
		return response;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getDocumentbyNameAsync = async (
	name: string
): Promise<ITodo | null> => {
	try {
		const db = await mongoose.connect('mongodb://localhost:27017/test');
		const response = await todoModel.findOne({ name });
		await db.disconnect();
		return response;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getDocumentsAsync = async (
	search: string,
	pageIndex: number,
	pageSize: number
): Promise<Array<ITodo> | null> => {
	try {
		const db = await mongoose.connect('mongodb://localhost:27017/test');
		console.log(search, pageIndex, pageSize);
		const response = await todoModel
			.find(search ? { name: search } : {})
			.limit(pageSize ?? 1)
			.skip(pageIndex ?? 10 * pageSize ?? 1)
			.exec();

		console.log(response);
		await db.disconnect();
		return response;
	} catch (error) {
		console.error(error);
		return null;
	}
};
