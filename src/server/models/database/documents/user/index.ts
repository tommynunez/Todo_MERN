import mongoose, { model, Schema } from 'mongoose';
import { IUserAccount } from '../../../user/UserInterfaces';

const userSchema = new Schema<IUserAccount>({
	emailAddress: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	salt: { type: String, required: true },
	lastSignedIn: { type: Date, required: false },
	createdDate: { type: Date, required: true },
	updatedDate: { type: Date, required: true },
	deletedDate: { type: Date, required: false },
});

export const userModel = model<IUserAccount>('UserAccount', userSchema);

export const insertUseraccountAsync = async (
	emailAddress: string,
	password: string,
	salt: string
): Promise<Document | undefined> => {
	const db = await mongoose.connect(process.env.NODE_MONGO_DB_URL);
	try {
		const user = new userModel({
			emailAddress: emailAddress,
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
			throw 'Please try a different emailAddress';
		} else {
			throw 'We could not create account. Please try again.';
		}
	}
};

export const doesUserbyEmailAddressAsync = async (
	emailAddress: string
): Promise<boolean> => {
	try {
		const document = await userModel.findOne({ emailAddress: emailAddress });
		return document ? true : false;
	} catch (error: any) {
		return false;
	}
};

export const getUserbyEmailAddressAsync = async (
	emailAddress: string
): Promise<
	| (mongoose.Document<unknown, IUserAccount> &
			IUserAccount &
			Required<{
				_id: unknown;
			}>)
	| null
> => {
	try {
		const document = await userModel.findOne({ emailAddress: emailAddress });
		return document;
	} catch (error: any) {
		return null;
	}
};

export const updateLastLoggedInAsync = async (
	document:
		| (mongoose.Document<unknown, IUserAccount> &
				IUserAccount &
				Required<{
					_id: unknown;
				}>)
		| null
): Promise<boolean> => {
	try {
		console.log('***8' + document);
		if (!document) {
			throw 'document is undefined';
		}
		await userModel.findByIdAndUpdate(
			{ id: document.id },
			{ lastSignedIn: new Date(), updatedDate: new Date() },
			{ upsert: false, new: false }
		);

		return true;
	} catch (error: any) {
		return false;
	}
};
