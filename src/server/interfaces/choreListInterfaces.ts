import mongoose, { ObjectId, Types } from "mongoose";

export interface IChoreList extends mongoose.Document {
  title: string;
  owner: ObjectId;
  shareWith: Array<IShareWith>;
  createdDate: Date;
  updatedDate: Date | null;
  deletedDate: Date | null;
}

export interface IShareWith {
  userId: ObjectId;
  permission: PermissionLevel;
}

type PermissionLevel = "read" | "write" | "admin";

export interface IChoreListAdd {
  title: String;
  owner: Types.ObjectId;
  shareWith: Array<IShareWith>;
  createdDate: Date;
}

export interface IChoreListUpdate {
  title: String;
  shareWith: Array<IShareWith>;
  updatedDate: Date;
}

export interface IChoreListDelete {
  deletedDate: Date;
}

export interface IChoreListService {
  insertDocumentAsync: (choreList: IChoreListAdd) => Promise<boolean>;
  updateDocumentAsync: (
    id: string,
    choreList: IChoreListUpdate,
  ) => Promise<boolean>;
  deleteDocumentAsync: (id: string) => Promise<boolean>;
  getByIdDocumentsAsync: (id: string) => Promise<IChoreList | null>;
  getAllDocumentsAsync: (
    ownerId: Types.ObjectId,
    search: any,
    pageIndex: any,
    pageSize: any,
  ) => Promise<Array<IChoreList> | null>;
}
