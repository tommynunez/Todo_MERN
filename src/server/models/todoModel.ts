import mongoose, { Schema, model } from 'mongoose';
import { ITodo, ITodoAdd, ITodoUpdate } from '../interfaces/todoInterface';

const todoSchema = new Schema<ITodo>({
	name: { type: String, required: true, unique: false },
	completed: { type: Boolean, required: true },
	completedDate: { type: Date, required: false },
});

export const todoModel = model<ITodo>('Todo', todoSchema);

export const insertDocumentAsync = async ({
	name,
}: ITodoAdd): Promise<boolean> => {
	const db = await mongoose.connect(process.env.NODE_MONGO_DB_URL);
	try {
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
		db.disconnect();
		return false;
	}
};

export const updateDocumentAsync = async ({
	name,
	completed,
}: ITodoUpdate): Promise<boolean> => {
	const db = await mongoose.connect(process.env.NODE_MONGO_DB_URL);
	try {
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
		db.disconnect();
		return false;
	}
};

export const deleteDocumentAsync = async (id: number): Promise<boolean> => {
	const db = await mongoose.connect(process.env.NODE_MONGO_DB_URL);
	try {
		await todoModel.findOneAndDelete({ id });
		await db.disconnect();
		return true;
	} catch (error) {
		console.error(error);
		db.disconnect();
		return false;
	}
};

export const getDocumentbyIdAsync = async (
	id?: string
): Promise<ITodo | null> => {
	const db = await mongoose.connect(process.env.NODE_MONGO_DB_URL);
	try {
		const response = await todoModel.findById(id);
		await db.disconnect();
		return response;
	} catch (error) {
		console.log(error);
		db.disconnect();
		return null;
	}
};

export const getDocumentsAsync = async (
	search: string,
	pageIndex: number,
	pageSize: number
): Promise<Array<ITodo> | null> => {
	const db = await mongoose.connect(process.env.NODE_MONGO_DB_URL);
	try {
		pageSize = pageSize ?? 0;
		pageIndex = pageIndex ?? 10;

		const response = await todoModel
			.find(search ? { name: search } : {})
			.limit(pageSize)
			.skip(pageIndex * pageSize)
			.exec();

		await db.disconnect();
		return response;
	} catch (error) {
		console.error(error);
		db.disconnect();
		return null;
	}
};
