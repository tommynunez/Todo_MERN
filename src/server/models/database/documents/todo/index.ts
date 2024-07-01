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
		const db = await mongoose.connect(process.env.NODE_MONGO_DB_URL);
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
		const db = await mongoose.connect(process.env.NODE_MONGO_DB_URL);
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
		const db = await mongoose.connect(process.env.NODE_MONGO_DB_URL);
		await todoModel.findOneAndDelete({ id });
		await db.disconnect();
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const getDocumentbyIdAsync = async (
	id?: string
): Promise<ITodo | null> => {
	try {
		const db = await mongoose.connect(process.env.NODE_MONGO_DB_URL);
		const response = await todoModel.findById(id);
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
		console.log('tt', process);
		const db = await mongoose.connect(process.env.NODE_MONGO_DB_URL);

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
		return null;
	}
};
