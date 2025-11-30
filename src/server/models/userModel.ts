import { model, Schema } from "mongoose";
import { IUserAccount } from "../interfaces/userInterface";

const userSchema = new Schema<IUserAccount>(
  {
    emailAddress: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    token: { type: String, required: false },
    isEmailConfirmed: { type: Boolean, required: true, default: false },
    lastSignedIn: { type: Date, required: false },
  },
  {
    timestamps: true,
  }
);

export const userModel = model<IUserAccount>("UserAccount", userSchema);
