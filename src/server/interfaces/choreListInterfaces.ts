import mongoose, { Schema } from "mongoose";
import { Role } from "../constants/Roles";
import { IService } from "./service";

export interface IChoreList extends mongoose.Document {
  title: string;
  owner: Schema.Types.ObjectId;
  shareWith: Array<IShareWith>;
}

export interface IShareWith {
  userId: Schema.Types.ObjectId;
  role: Role;
}

export interface IChoreListAdd {
  title: String;
  owner: Schema.Types.ObjectId;
}

export interface IChoreListUpdate {
  title: String;
  shareWith: Array<IShareWith>;
  updatedDate: Date;
}

export interface IChoreListDelete {
  deletedDate: Date;
}

export interface IChoreListService extends IService {
  insertChorelistAsync: (
    choreList: IChoreListAdd
  ) => Promise<Document | boolean>;
  updateChorelistAsync: (
    id: string,
    choreList: IChoreListUpdate
  ) => Promise<boolean>;
  deleteChorelistAsync: (id: string) => Promise<boolean>;
  getByIdDocumentsAsync: (
    id: string,
    ownerId: string
  ) => Promise<IChoreList | null>;
  getAllDocumentsAsync: (
    ownerId: string,
    search: any,
    pageIndex: any,
    pageSize: any
  ) => Promise<Array<IChoreList> | null>;
}
