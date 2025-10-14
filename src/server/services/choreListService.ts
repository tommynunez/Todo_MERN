import { Types } from "mongoose";
import {
  IChoreList,
  IChoreListAdd,
  IChoreListService,
  IChoreListUpdate,
} from "../interfaces/choreListInterfaces";
import { ChoreRepository } from "../models/choreListModel";

export default class ChoreListService implements IChoreListService {
  constructor(private choreRepository: ChoreRepository) {}

  /**
   * Create a new chore list document
   * @param choreList
   * @return boolean
   */
  insertChorelistAsync = async (choreList: IChoreListAdd): Promise<boolean> => {
    return await this.choreRepository.insertChorelistAsync(choreList);
  };

  /**
   * Update a chore list document
   * @param id
   *
   * @param choreList
   * @return boolean
   */
  updateChorelistAsync = async (
    id: string,
    choreList: IChoreListUpdate
  ): Promise<boolean> => {
    return this.choreRepository.updateChorelistAsync(id, choreList);
  };

  /**
   * Delete a chore list document
   * @param id
   * @return boolean
   */
  deleteChorelistAsync = async (id: string): Promise<boolean> => {
    return await this.choreRepository.deleteChorelistAsync(id);
  };

  /**
   * Get a chore list document by id
   *
   * @param id
   * @return IChoreList | null
   */
  getByIdDocumentsAsync = async (id: string): Promise<IChoreList | null> => {
    return await this.choreRepository.getDocumentbyIdAsync(id);
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
    pageSize: any
  ): Promise<Array<IChoreList> | null> => {
    return await this.choreRepository.getDocumentsAsync(
      ownerId,
      search,
      pageIndex,
      pageSize
    );
  };
}
