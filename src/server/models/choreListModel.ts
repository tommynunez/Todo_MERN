import mongoose, { Schema, model } from "mongoose";
import { IChoreList, IShareWith } from "../interfaces/choreListInterfaces";
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
