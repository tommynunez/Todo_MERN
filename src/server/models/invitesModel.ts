import mongoose, { Types } from "mongoose";
import { IInvite } from "../interfaces/inviteInterface";
import { Roles } from "../constants/Roles";
import { InviteStatuses } from "../constants/InviteStatuses";
import { InviteTypes } from "../constants/InviteType";

const inviteSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    listId: {
      type: Types.ObjectId,
      required: true,
      ref: "ChoreList",
    },
    role: { type: String, enum: Object.values(Roles), required: true },
    type: { type: String, enum: Object.values(InviteTypes), required: true },
    status: {
      type: String,
      enum: Object.values(InviteStatuses),
      required: true,
    },
    token: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const inviteModel = mongoose.model<IInvite>("Invite", inviteSchema);
