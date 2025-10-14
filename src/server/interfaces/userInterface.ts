import mongoose from "mongoose";
import { IService } from "./service";

export interface IUserAccount extends mongoose.Document {
  emailAddress: string;
  password: string;
  salt: string;
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
}
