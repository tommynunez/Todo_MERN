import mongoose from "mongoose";
import { IInvite, IInviteAdd, IInviteDelete, IInviteUpdate } from "../interfaces/inviteInterface";

const inviteSchema = new mongoose.Schema({
    email: { type: String, required: true },
    listId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'ChoreList' },
    role: { type: String, enum: ['read', 'write', 'admin'], required: true },
    token: { type: String, required: true, unique: true },
    accepted: { type: Boolean, default: false },
    expiresAt: { type: Date, required: true }
}, { timestamps: true });

const inviteModel = mongoose.model<IInvite>("Invite", inviteSchema);

export const insertDocumentAsync = async (invite: IInviteAdd): Promise<boolean> => {
  const db = await mongoose.connect(process.env.NODE_MONGO_DB_URL);
  try {
    const newInvite = new inviteModel({
      email: invite.email,
      listId: invite.listId,
      role: invite.role,
      token: invite.token,
      expiresAt: invite.expiresAt
    });
    await newInvite.save();
    db.disconnect();
    return true;
  } catch (error) {
    console.error(error);
    db.disconnect();
    return false;
  }
}

export const updateDocumentAsync = async (id: string, invite: IInviteUpdate): Promise<boolean> => {
	const db = await mongoose.connect(process.env.NODE_MONGO_DB_URL);
	try {
		const updatedInvite = await inviteModel.findByIdAndUpdate(id, invite, { new: true });
		db.disconnect();
		return updatedInvite ? true : false;
	} catch (error) {
		console.error(error);
		db.disconnect();
		return false;
	}
};

export const deleteDocumentAsync = async (inviteDelete: IInviteDelete): Promise<boolean> => {
	const db = await mongoose.connect(process.env.NODE_MONGO_DB_URL);
	try {
		const deletedInvite = await inviteModel.findByIdAndUpdate(
			inviteDelete.id, 
			{ 
				expiresAt: inviteDelete.expiresAt, 
				updatedAt: inviteDelete.updatedAt 
			});
			
		db.disconnect();
		return deletedInvite ? true : false;
	} catch (error) {
		console.error(error);
		db.disconnect();
		return false;
	}
};

export const getByIdDocumentsAsync = async (id: string): Promise<IInvite | null> => {
	const db = await mongoose.connect(process.env.NODE_MONGO_DB_URL);
	try {
		const invite = await inviteModel.findById(id);
		db.disconnect();
		return invite;
	} catch (error) {
		console.error(error);
		db.disconnect();
		return null;
	}
};

export const getAllDocumentsAsync = async (
	listId: mongoose.Schema.Types.ObjectId,
	search: any,
	pageIndex: any,
	pageSize: any
): Promise<IInvite[]> => {
	const db = await mongoose.connect(process.env.NODE_MONGO_DB_URL);
	try {
		const invites = await inviteModel
		.find({ listId, ...search })
		.skip(pageIndex * pageSize)
		.limit(pageSize)
		.exec();
		db.disconnect();
		return invites;
	} catch (error) {
		console.error(error);
		db.disconnect();
		return [];
	}
};

export default inviteModel;