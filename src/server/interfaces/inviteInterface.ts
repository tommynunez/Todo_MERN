import mongoose, { Types } from "mongoose";
import { Role } from "../constants/Roles";
import { TokenStatus } from "../constants/TokenStatuses";
import { InviteType } from "../constants/InviteType";
import { IService } from "./service";

export interface IInvite extends mongoose.Document {
  inviterName: string;
  email: string;
  listId: Types.ObjectId;
  role: Role;
  type: InviteType;
  status: TokenStatus;
  token: string;
}

export interface IInviteResponse {
  listId: Types.ObjectId;
  role: Role;
  type: InviteType;
  status: TokenStatus;
}

export interface IInviteAdd {
  inviterName: string;
  email: string;
  listId: Types.ObjectId;
  role: Role;
  type: InviteType;
  status: TokenStatus;
  token: string;
}

export interface IInviteUpdate {
  token: string;
}

export interface IInviteDelete {
  id: Types.ObjectId;
  status: TokenStatus;
  updatedAt: Date;
}

export interface InvitePayload {
  listId: string;
  email: string;
  role: Role;
  type: InviteType;
  status: TokenStatus;
}

export interface IInviteService extends IService {
  createInviteAsync: (invite: IInviteAdd) => Promise<boolean>;
  getInvitebyIdAsync: (id: Types.ObjectId) => Promise<IInviteResponse | null>;
  inactivateInviteAsync: (inviteDelete: IInviteDelete) => Promise<boolean>;
  verifyInviteandUpdateAsync: (invite: IInviteUpdate) => Promise<boolean>;
}
