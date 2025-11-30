import { model, Schema } from "mongoose";
import { IUserAccount } from "../interfaces/userInterface";
import { TokenStatuses } from "../constants/TokenStatuses";

const userSchema = new Schema<IUserAccount>(
  {
    emailAddress: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    token: { type: String, required: false },
    emailConfirmationAttempts: { type: Number, required: true, default: 0 },
    isEmailConfirmed: { type: Boolean, required: true, default: false },
    status: {
      type: String,
      enum: Object.values(TokenStatuses),
      required: true,
    },
    lastSignedIn: { type: Date, required: false },
  },
  {
    timestamps: true,
  }
);

export const userModel = model<IUserAccount>("UserAccount", userSchema);
