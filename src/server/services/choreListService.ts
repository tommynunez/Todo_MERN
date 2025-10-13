import { Types } from "mongoose";
import {
  IChoreList,
  IChoreListAdd,
  IChoreListService,
  IChoreListUpdate,
} from "../interfaces/choreListInterfaces";
import {
  deleteDocumentAsync,
  getDocumentbyIdAsync,
  getDocumentsAsync,
  insertDocumentAsync,
  updateDocumentAsync,
} from "../models/choreListModel";

export default class ChoreListService implements IChoreListService {
  constructor() {}
  /**
   * Create a new chore list document
   * @param choreList
   * @return boolean
   */
  insertDocumentAsync = async (choreList: IChoreListAdd): Promise<boolean> => {
    return await insertDocumentAsync(choreList);
  };

  /**
   * Update a chore list document
   * @param id
   *
   * @param choreList
   * @return boolean
   */
  updateDocumentAsync = async (
    id: string,
    choreList: IChoreListUpdate,
  ): Promise<boolean> => {
    return updateDocumentAsync(id, choreList);
  };

  /**
   * Delete a chore list document
   * @param id
   * @return boolean
   */
  deleteDocumentAsync = async (id: string): Promise<boolean> => {
    return await deleteDocumentAsync(id);
  };

  /**
   * Get a chore list document by id
   *
   * @param id
   * @return IChoreList | null
   */
  getByIdDocumentsAsync = async (id: string): Promise<IChoreList | null> => {
    return await getDocumentbyIdAsync(id);
  };

  /**
   * Get all chore list documents with pagination
   * @param search
   * @param pageIndex
   * @param pageSize
   * @return Array<IChoreList> | null
   */
  getAllDocumentsAsync = async (
    ownerId: Types.ObjectId,
    search: any,
    pageIndex: any,
    pageSize: any,
  ): Promise<Array<IChoreList> | null> => {
    return await getDocumentsAsync(ownerId, search, pageIndex, pageSize);
  };
}
