import mongoose from "mongoose";
import { userModel } from "../models/userModel";
import { IUserAccount } from "../interfaces/userInterface";

export class UserRepository {
  constructor() {}
  insertUseraccountAsync = async (
    emailAddress: string,
    password: string,
    salt: string,
    token?: string,
    isEmailConfirmed: boolean = false
  ): Promise<Document | undefined> => {
    try {
      const user = new userModel({
        emailAddress: emailAddress,
        password: password,
        salt: salt,
        isEmailConfirmed: isEmailConfirmed,
        token: token || "",
        createdDate: Date.now(),
        updatedDate: Date.now(),
      });
      await user.save();
      return user;
    } catch (error: any) {
      if (error.errorResponse.code === 11000) {
        throw "Please try a different emailAddress";
      } else {
        throw "We could not create account. Please try again.";
      }
    }
  };

  getUserbyEmailAddressAsync = async (
    emailAddress: string
  ): Promise<
    | (mongoose.Document<unknown, IUserAccount> &
        IUserAccount &
        Required<{
          _id: unknown;
        }>)
    | null
  > => {
    try {
      const document = await userModel.findOne({ emailAddress: emailAddress });
      return document;
    } catch (error: any) {
      return null;
    }
  };

  getUserbyTokenAsync = async (
    token: string
  ): Promise<
    | (mongoose.Document<unknown, IUserAccount> &
        IUserAccount &
        Required<{
          _id: unknown;
        }>)
    | null
  > => {
    try {
      const document = await userModel.findOne({ token: token });
      return document;
    } catch (error: any) {
      return null;
    }
  };

  updateLastLoggedInAsync = async (
    document:
      | (mongoose.Document<unknown, IUserAccount> &
          IUserAccount &
          Required<{
            _id: unknown;
          }>)
      | null
  ): Promise<boolean> => {
    try {
      if (!document) {
        throw "document is undefined";
      }
      await userModel.findByIdAndUpdate(
        { id: document.id },
        { lastSignedIn: new Date(), updatedDate: new Date() },
        { upsert: false, new: false }
      );
      return true;
    } catch (error: any) {
      return false;
    }
  };
}
