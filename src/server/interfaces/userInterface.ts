import mongoose from "mongoose";
import { IService } from "./service";

export interface IUserAccount extends mongoose.Document {
  emailAddress: string;
  password: string;
  salt: string;
  tokenStatus: string;
  emailConfirmationAttempts: number;
  isEmailConfirmed: boolean;
  token: string;
  lastSignedIn: Date;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date;
}

export interface IUserService extends IService {
  signup: (emailAddress: string, password: string) => Promise<boolean>;
  signin: (
    emailAddress: string,
    password: string,
    user: any
  ) => Promise<boolean>;
  getUserbyEmailAddressAsync: (emailAddress: string) => Promise<
    | (mongoose.Document<unknown, IUserAccount> &
        IUserAccount &
        Required<{
          _id: unknown;
        }>)
    | null
  >;
  confirmEmailAsync: (emailAddress: string, token: string) => Promise<boolean>;
  sendForgotpasswordEmailAsync: (emailAddress: string) => Promise<boolean>;
  resetPasswordAsync: (
    emailAddress: string,
    token: string,
    password: string,
    confirmPassword: string
  ) => Promise<[success: boolean, user: IUserAccount]>;
}
