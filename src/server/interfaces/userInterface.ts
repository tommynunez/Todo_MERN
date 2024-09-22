import mongoose from 'mongoose';

export interface IUserAccount extends mongoose.Document {
	emailAddress: string;
	password: string;
	salt: string;
	lastSignedIn: Date;
	createdDate: Date;
	updatedDate: Date;
	deletedDate: Date;
}
