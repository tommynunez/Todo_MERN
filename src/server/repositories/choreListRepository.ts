import { Types } from "mongoose";
import {
  IChoreList,
  IChoreListAdd,
  IChoreListUpdate,
} from "../interfaces/choreListInterfaces";
import { choreListModel } from "../models/choreListModel";

export class ChoreRepository {
  constructor() {}
  /**
   * Create a new chore list document
   * @param choreList
   * @returns
   */
  insertChorelistAsync = async (
    choreList: IChoreListAdd
  ): Promise<Document | boolean> => {
    try {
      const newChoreList = new choreListModel({
        title: choreList.title,
        owner: choreList.owner,
      });
      return await newChoreList.save();
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
      const result = await choreListModel.findOneAndDelete({
        _id: new Types.ObjectId(id),
      });

      if (result) {
        return true;
      }

      return false;
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
  getDocumentbyIdAsync = async (
    id: string,
    owner: string
  ): Promise<IChoreList | null> => {
    try {
      const response = await choreListModel.findOne({
        _id: new Types.ObjectId(id),
        owner: new Types.ObjectId(owner),
      });
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
    ownerId: string,
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
