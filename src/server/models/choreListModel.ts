import mongoose, { Schema, model } from "mongoose";
import { IChoreList, IShareWith } from "../interfaces/choreListInterfaces";
import { Roles } from "../constants/Roles";

const SharedWithSchema = new Schema<IShareWith>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "UserAccounts",
      required: true,
    },
    role: {
      type: String,
      enum: Roles,
      required: true,
    },
  },
  { timestamps: true }
);

const choreListSchema = new Schema<IChoreList>(
  {
    title: { type: String, required: true, unique: false },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAccounts",
      required: true,
    },
    shareWith: { type: [SharedWithSchema], required: false },
  },
  { timestamps: true }
);

export const choreListModel = model<IChoreList>("ChoreList", choreListSchema);
