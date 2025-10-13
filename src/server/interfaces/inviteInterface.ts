import mongoose, { Schema } from "mongoose";
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
  accepted: boolean;
}

export interface IInviteAdd {
  email: string;
  listId: Schema.Types.ObjectId;
  role: Role;
  type: InviteType;
  status: InviteStatus;
  token: string;
  accepted: boolean;
}

export interface IInviteUpdate {
  token: string;
  status: InviteStatus;
  accepted: boolean;
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
}

export interface IInviteService {
  createInviteAsync: (invite: IInviteAdd) => Promise<boolean>;
  verifyInviteandUpdateAsync: (
    id: string,
    invite: IInviteUpdate
  ) => Promise<boolean>;
  inactivateInviteAsync: (inviteDelete: IInviteDelete) => Promise<boolean>;
  getInvitebyIdAsync: (id: string) => Promise<IInvite | null>;
}
