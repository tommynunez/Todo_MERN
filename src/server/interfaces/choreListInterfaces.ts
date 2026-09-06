import mongoose, { Types } from 'mongoose';
import { Role } from '../constants/Roles';
import { IService } from './service';

export interface IChoreList extends mongoose.Document {
  title: string;
  owner: Types.ObjectId;
  shareWith: Array<IShareWith>;
}

export interface IShareWith {
  userId: Types.ObjectId;
  role: Role;
}

export interface IChoreListAdd {
  title: string;
  owner: Types.ObjectId;
}

export interface IChoreListAddRequest {
  title: string;
  owner: string;
}

export interface IChoreListUpdate {
  title: string;
  shareWith: Array<IShareWith>;
  updatedDate: Date;
}

export interface IChoreListDelete {
  deletedDate: Date;
}

export interface IChoreListService extends IService {
  insertChorelistAsync: (choreList: IChoreListAddRequest) => Promise<boolean>;
  updateChorelistAsync: (
    id: string,
    choreList: IChoreListUpdate,
  ) => Promise<boolean>;
  deleteChorelistAsync: (id: string) => Promise<boolean>;
  getByIdDocumentsAsync: (
    id: string,
    ownerId: string,
  ) => Promise<IChoreList | null>;
  getAllDocumentsAsync: (
    ownerId: string,
    search: string,
    pageIndex: number,
    pageSize: number,
  ) => Promise<Array<IChoreList> | null>;
}
