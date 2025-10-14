import mongoose, { Types } from "mongoose";
import { IInvite, IInviteDelete } from "../interfaces/inviteInterface";
import { Roles } from "../constants/Roles";
import { InviteStatuses } from "../constants/InviteStatuses";
import { InviteTypes } from "../constants/InviteType";

const inviteSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    listId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ChoreList",
    },
    role: { type: String, enum: Object.values(Roles), required: true },
    type: { type: String, enum: Object.values(InviteTypes), require: true },
    status: {
      type: String,
      enum: Object.values(InviteStatuses),
      required: true,
    },
    token: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

export const inviteModel = mongoose.model<IInvite>("Invite", inviteSchema);

export const inactivateInviteAsync = async (
  inviteDelete: IInviteDelete,
): Promise<boolean> => {
  try {
    const existingInvite = await inviteModel.findByIdAndUpdate(
      inviteDelete.id,
      {},
    );
    if (!existingInvite) {
      throw new Error("Invite not found");
    }
    await inviteModel.findByIdAndDelete(inviteDelete.id);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
export const getInvitebyEmailAsync = async (
  email: string,
): Promise<IInvite | null> => {
  try {
    return await inviteModel.findOne({ email }).lean();
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const getInvitebyIdAsync = async (
  id: Types.ObjectId,
): Promise<IInvite | null> => {
  try {
    return await inviteModel.findById(id).lean();
  } catch (error) {
    console.error(error);
    return null;
  }
};
