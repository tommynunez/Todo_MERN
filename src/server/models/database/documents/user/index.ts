import mongoose, { model, Schema } from 'mongoose';
import { IUserAccount } from '../../../user/UserInterfaces';

const userSchema = new Schema<IUserAccount>({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	salt: { type: String, required: true },
	createdDate: { type: Date, required: true },
	updatedDate: { type: Date, required: true },
	deletedDate: { type: Date, required: false },
});

export const userModel = model<IUserAccount>('UserAccount', userSchema);

export const insertUseraccountAsync = async (
	username: string,
	password: string,
	salt: string
): Promise<Document | undefined> => {
	const db = await mongoose.connect(process.env.NODE_MONGO_DB_URL);
	try {
		const user = new userModel({
			username: username,
			password: password,
			salt: salt,
			createdDate: Date.now(),
			updatedDate: Date.now(),
		});
		await user.save();
		db.disconnect();
		return;
	} catch (error: any) {
		db.disconnect();

		if (error.errorResponse.code === 11000) {
			throw 'Please try a different username';
		} else {
			throw 'We could not create account. Please try again.';
		}
	}
};
