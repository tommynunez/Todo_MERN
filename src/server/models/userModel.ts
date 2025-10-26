import mongoose, { model, Schema } from "mongoose";
import { IUserAccount } from "../interfaces/userInterface";

const userSchema = new Schema<IUserAccount>({
  emailAddress: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  lastSignedIn: { type: Date, required: false },
  createdDate: { type: Date, required: true },
  updatedDate: { type: Date, required: true },
  deletedDate: { type: Date, required: false },
});

export const userModel = model<IUserAccount>("UserAccount", userSchema);
