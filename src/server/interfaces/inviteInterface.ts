import mongoose, { Schema, Types } from "mongoose";
import { Role } from "../constants/Roles";
import { InviteStatus } from "../constants/InviteStatuses";
import { InviteType } from "../constants/InviteType";

export interface IInvite extends mongoose.Document {
  email: string;
  listId: Schema.Types.ObjectId;
  role: Role;
  type: InviteType;
  status: InviteStatus;
  token: string;
}

export interface IInviteAdd {
  email: string;
  listId: Schema.Types.ObjectId;
  role: Role;
  type: InviteType;
  status: InviteStatus;
  token: string;
}

export interface IInviteUpdate {
  token: string;
}

export interface IInviteDelete {
  id: Schema.Types.ObjectId;
  status: InviteStatus;
  updatedAt: Date;
}

export interface InvitePayload {
  listId: string;
  email: string;
  role: Role;
  type: InviteType;
  status: InviteStatus;
}

export interface IInviteService {
  createInviteAsync: (invite: IInviteAdd) => Promise<boolean>;
  verifyInviteandUpdateAsync: (invite: IInviteUpdate) => Promise<boolean>;
  inactivateInviteAsync: (inviteDelete: IInviteDelete) => Promise<boolean>;
  getInvitebyIdAsync: (id: Types.ObjectId) => Promise<IInvite | null>;
}
