import mongoose, { Schema, Types, model } from "mongoose";
import { IChoreList, IChoreListAdd, IChoreListUpdate, IShareWith } from "../interfaces/choreListInterfaces";

const SharedWithSchema = new Schema<IShareWith>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  permission: { type: String, enum: ['read', 'write', 'admin'], required: true }
});

const choreListSchema = new Schema<IChoreList>({
  title: { type: String, required: true, unique: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shareWith: { type: [SharedWithSchema], required: false },
  createdDate: { type: Date, required: true },
  updatedDate: { type: Date, required: false },
  deletedDate: { type: Date, required: false },
});

export const choreListModel = model<IChoreList>('ChoreList', choreListSchema);

/**
 * Create a new chore list document
 * @param choreList 
 * @returns 
 */
export const insertDocumentAsync = async (choreList: IChoreListAdd): Promise<boolean> => {
  const db = await mongoose.connect(process.env.NODE_MONGO_DB_URL);
  try {
    const newChoreList = new choreListModel({
      title: choreList.title,
      owner: choreList.owner,
      shareWith: choreList.shareWith,
      createdDate: choreList.createdDate,
    });
    await newChoreList.save();
    db.disconnect();
    return true;
  }
  catch (error) {
    console.error(error);
    db.disconnect();
    return false;
  }
};

/**
 * Update a chore list document
 * @param id 
 * @param choreList 
 * @returns 
 */
export const updateDocumentAsync = async (id: string, choreList: IChoreListUpdate): Promise<boolean> => {
  const db = await mongoose.connect(process.env.NODE_MONGO_DB_URL);
  try {
    await choreListModel.findByIdAndUpdate({id}, 
      {
        title: choreList.title,
        shareWith: choreList.shareWith,
        updatedDate: choreList.updatedDate,
      }
    );
    db.disconnect();
    return true;
  }
  catch (error) {
    console.error(error);
    db.disconnect();
    return false;
  }
};

/**
 * Delete a chore list document
 * @param id 
 * @returns 
 */
export const deleteDocumentAsync = async (id: string): Promise<boolean> => {
  const db = await mongoose.connect(process.env.NODE_MONGO_DB_URL);
  try {
    await choreListModel.findOneAndDelete({id});
    await db.disconnect();
    return true;
  } catch (error) {
    console.error(error);
    await db.disconnect();
    return false;
  }
}

/**
 * Get a chore list document by id
 * @param id 
 * @returns 
 */
export const getDocumentbyIdAsync = async (id: string): Promise<IChoreList | null> => {
  const db = await mongoose.connect(process.env.NODE_MONGO_DB_URL);
  try {
    const response = await choreListModel.findById(id);
    await db.disconnect();
    return response;
  } catch (error) {
    console.log(error);
    db.disconnect();
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
export const getDocumentsAsync = async (
  ownerId: Types.ObjectId,
  search: string,
  pageIndex: number,
  pageSize: number
): Promise<Array<IChoreList> | null> => {
  const db = await mongoose.connect(process.env.NODE_MONGO_DB_URL);

  try {
    const response = await choreListModel
      .find(
        { 
          title: 
          { 
            $regex: search, 
            $options: 'i' 
          }, 
          owner: ownerId 
        }
      )
      .skip((pageIndex ?? 0) * (pageSize ?? 10))
      .limit(pageSize)
      .exec() || [];
    await db.disconnect();
    return response;
  } catch (error) {
    console.log(error);
    db.disconnect();
    return null;
  }
};
