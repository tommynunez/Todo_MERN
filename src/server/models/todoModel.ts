import mongoose, { Schema, model } from "mongoose";
import { ITodo } from "../interfaces/todoInterface";

const todoSchema = new Schema<ITodo>(
  {
    choreListId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChoreList",
      required: true,
    },
    name: { type: String, required: true, unique: false },
    completed: { type: Boolean, required: true },
    completedDate: { type: Date, required: false },
  },
  { timestamps: true }
);

export const todoModel = model<ITodo>("Todo", todoSchema);
