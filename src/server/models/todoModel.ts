import mongoose, { Schema, model } from "mongoose";
import { IComplete, ITodo } from "../interfaces/todoInterface";

const completeSchema = new Schema<IComplete>(
  {
    by: { type: String },
    isCompleted: { type: Boolean },
    completedDate: { type: Date },
  },
  { _id: false }
);

const todoSchema = new Schema<ITodo>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAccount",
      reqiured: true,
    },
    choreListId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChoreList",
      required: true,
    },
    name: { type: String, required: true, unique: false },
    complete: [completeSchema],
  },
  { timestamps: true }
);

export const todoModel = model<ITodo>("Todo", todoSchema);
