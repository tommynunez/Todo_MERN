import mongoose, { Types } from 'mongoose';
import { Role } from '../constants/Roles';
import { TokenStatus } from '../constants/TokenStatuses';
import { InviteType } from '../constants/InviteType';
import { IService } from './service';

export interface IInvite extends mongoose.Document {
  inviterName: string;
  email: string;
  listId: Types.ObjectId;
  role: Role;
  type: InviteType;
  status: TokenStatus;
  token: string;
}

export interface IInviteRequest {
  inviterName: string;
  email: string;
  listId: string;
  role: Role;
  type: InviteType;
  status: TokenStatus;
  token: string;
}

export interface IInviteResponse {
  listId: string;
  role: Role;
  type: InviteType;
  status: TokenStatus;
}

export interface IInviteAdd {
  inviterName: string;
  email: string;
  listId: string;
  role: Role;
  type: InviteType;
  status: TokenStatus;
  token: string;
}

export interface IInviteUpdate {
  token: string;
}

export interface IInviteDelete {
  id: string;
  status: TokenStatus;
}

export interface IInviteTokenPayload {
  listId: string;
  email: string;
  role: Role;
  type: InviteType;
}

export type VerifyInviteTokenResult =
  | { isValid: true; payload: IInviteTokenPayload }
  | { isValid: false; status: TokenStatus };

export interface IInviteService extends IService {
  createInviteAsync: (invite: IInviteAdd) => Promise<boolean>;
  getInvitebyIdAsync: (id: string) => Promise<IInviteResponse | null>;
  inactivateInviteAsync: (inviteDelete: IInviteDelete) => Promise<boolean>;
  verifyInviteandUpdateAsync: (invite: IInviteUpdate) => Promise<boolean>;
}
