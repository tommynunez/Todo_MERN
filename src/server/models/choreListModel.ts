import mongoose, { Schema, Types, model } from "mongoose";
import {
  IChoreList,
  IChoreListAdd,
  IChoreListUpdate,
  IShareWith,
} from "../interfaces/choreListInterfaces";
import { Roles } from "../constants/Roles";

const SharedWithSchema = new Schema<IShareWith>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  role: {
    type: String,
    enum: Roles,
    required: true,
  },
});

const choreListSchema = new Schema<IChoreList>({
  title: { type: String, required: true, unique: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  shareWith: { type: [SharedWithSchema], required: false },
  createdDate: { type: Date, required: true },
  updatedDate: { type: Date, required: false },
  deletedDate: { type: Date, required: false },
});

export const choreListModel = model<IChoreList>("ChoreList", choreListSchema);

export class ChoreRepository {
  constructor() {}
  /**
   * Create a new chore list document
   * @param choreList
   * @returns
   */
  insertChorelistAsync = async (choreList: IChoreListAdd): Promise<boolean> => {
    try {
      const newChoreList = new choreListModel({
        title: choreList.title,
        owner: choreList.owner,
        shareWith: choreList.shareWith,
        createdDate: choreList.createdDate,
      });
      await newChoreList.save();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  /**
   * Update a chore list document
   * @param id
   * @param choreList
   * @returns
   */
  updateChorelistAsync = async (
    id: string,
    choreList: IChoreListUpdate
  ): Promise<boolean> => {
    try {
      await choreListModel.findByIdAndUpdate(
        { id },
        {
          title: choreList.title,
          shareWith: choreList.shareWith,
          updatedDate: choreList.updatedDate,
        }
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  /**
   * Delete a chore list document
   * @param id
   * @returns
   */
  deleteChorelistAsync = async (id: string): Promise<boolean> => {
    try {
      await choreListModel.findOneAndDelete({ id });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  /**
   * Get a chore list document by id
   * @param id
   * @returns
   */
  getDocumentbyIdAsync = async (id: string): Promise<IChoreList | null> => {
    try {
      const response = await choreListModel.findById(id);
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  /**
   * Get all chore list documents with paginationhujhjv
   * @param ownerId
   * @param search
   * @param pageIndex
   * @param pageSize
   * @returns
   */
  getDocumentsAsync = async (
    ownerId: Types.ObjectId,
    search: string,
    pageIndex: number,
    pageSize: number
  ): Promise<Array<IChoreList> | null> => {
    try {
      const response =
        (await choreListModel
          .find({
            title: {
              $regex: search,
              $options: "i",
            },
            owner: ownerId,
          })
          .skip((pageIndex ?? 0) * (pageSize ?? 10))
          .limit(pageSize)
          .exec()) || [];
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
}
