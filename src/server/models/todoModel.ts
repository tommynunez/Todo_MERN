import { Schema, model } from "mongoose";
import { ITodo } from "../interfaces/todoInterface";

const todoSchema = new Schema<ITodo>({
  name: { type: String, required: true, unique: false },
  completed: { type: Boolean, required: true },
  completedDate: { type: Date, required: false },
});

export const todoModel = model<ITodo>("Todo", todoSchema);

