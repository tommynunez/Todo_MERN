import mongoose from 'mongoose';

export interface IUserAccount extends mongoose.Document {
	username: string;
	password: string;
	salt: string;
	createdDate: Date;
	updatedDate: Date;
	deletedDate: Date;
}
