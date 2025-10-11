import mongoose, { Schema, model } from "mongoose";
import { IChoreList, IChoreListAdd, IChoreListUpdate } from "../interfaces/choreListInterfaces";

const choreListSchema = new Schema<IChoreList>({
  title: { type: String, required: true, unique: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shareWith: { type: Array, required: false },
  createdDate: { type: Date, required: true },
  updatedDate: { type: Date, required: false },
  deletedDate: { type: Date, required: false },
});

export const choreListModel = model<IChoreList>('ChoreList', choreListSchema);
export const insertDocumentAsync = async (choreList: IChoreListAdd): Promise<boolean> => {
  const db = await mongoose.connect(process.env.NODE_MONGO_DB_URL);
  try {
    const newChoreList = new choreListModel({
        