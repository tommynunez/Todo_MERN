import mongoose, { Schema } from "mongoose";
import { RoleType } from "../types/RoleType";

export interface IInvite extends mongoose.Document {
  email: string;
  listId: Schema.Types.ObjectId;
  role: RoleType;
  token: string;
  accepted: boolean;
  hasExpired: boolean;
}

export interface IInviteAdd {
  email: string;
  listId: Schema.Types.ObjectId;
  role: RoleType;
  token: string;
  accepted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IInviteUpdate {
  token: string;
  accepted: boolean;
  updatedAt: Date;
  hasExpired: boolean;
}

export interface IInviteDelete {
  id: Schema.Types.ObjectId;
  hasExpired: Boolean;
  updatedAt: Date;
}

export interface InvitePayload {
  listId: string;
  email: string;
  role: RoleType;
}

export interface IInviteService {
  createInviteAsync: (invite: IInviteAdd) => Promise<boolean>;
  verifyInviteandUpdateAsync: (
    id: string,
    invite: IInviteUpdate,
  ) => Promise<boolean>;
  inactivateInviteAsync: (inviteDelete: IInviteDelete) => Promise<boolean>;
  getInvitebyIdAsync: (id: string) => Promise<IInvite | null>;
}
