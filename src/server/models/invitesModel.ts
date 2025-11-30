import { model, Schema } from "mongoose";
import { IInvite } from "../interfaces/inviteInterface";
import { Roles } from "../constants/Roles";
import { TokenStatuses } from "../constants/TokenStatuses";
import { InviteTypes } from "../constants/InviteType";

const inviteSchema = new Schema<IInvite>(
  {
    email: { type: String, required: true },
    listId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "ChoreList",
    },
    role: { type: String, enum: Object.values(Roles), required: true },
    type: { type: String, enum: Object.values(InviteTypes), required: true },
    status: {
      type: String,
      enum: Object.values(TokenStatuses),
      required: true,
    },
    token: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const inviteModel = model<IInvite>("Invite", inviteSchema);
