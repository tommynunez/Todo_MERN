import mongoose from "mongoose";
import { userModel } from "../models/userModel";
import { IUserAccount } from "../interfaces/userInterface";
import { TokenStatuses } from "../constants/TokenStatuses";

export class UserRepository {
  constructor() {}
  insertUseraccountAsync = async (
    emailAddress: string,
    password: string,
    salt: string,
    tokenStatus: string,
    token?: string,
    isEmailConfirmed: boolean = false
  ): Promise<Document | undefined> => {
    try {
      const user = new userModel({
        emailAddress: emailAddress,
        password: password,
        salt: salt,
        tokenStatus: tokenStatus,
        isEmailConfirmed: isEmailConfirmed,
        token: token || "",
        createdDate: Date.now(),
        updatedDate: Date.now(),
      });
      await user.save();
      return user;
    } catch (error: any) {
      if (error.errorResponse.code === 11000) {
        throw new Error("Please try a different emailAddress");
      } else {
        throw new Error("We could not create account. Please try again.");
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
      console.error(error);
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
      console.error(error);
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
        document._id,
        {
          loginAttempts: 0,
          lastSignedIn: new Date(),
          updatedDate: new Date(),
        },
        { new: false }
      );
      return true;
    } catch (error: any) {
      console.error(error);
      return false;
    }
  };

  updateLoginCountAsync = async (
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

      const loginAttempts = document.loginAttempts + 1;

      await userModel.findByIdAndUpdate(
        document._id,
        {
          loginAttempts: loginAttempts,
          isLockedOut: loginAttempts >= 3,
          updatedDate: new Date(),
        },
        { new: false }
      );
      return true;
    } catch (error: any) {
      console.error(error);
      return false;
    }
  };

  resetPasswordAsync = async (
    document:
      | (mongoose.Document<unknown, IUserAccount> &
          IUserAccount &
          Required<{
            _id: unknown;
          }>)
      | null,
    hashedPassword: string,
    salt: string
  ): Promise<boolean> => {
    try {
      if (!document) {
        throw "document is undefined";
      }
      await userModel.findByIdAndUpdate(
        document._id,
        {
          password: hashedPassword,
          salt: salt,
          loginAttempts: 0,
          isLockedOut: false,
          updatedDate: new Date(),
        },
        { new: false }
      );
      return true;
    } catch (error: any) {
      console.error(error);
      return false;
    }
  };

  updateEmailconfirmedCountAsync = async (
    document:
      | (mongoose.Document<unknown, IUserAccount> &
          IUserAccount &
          Required<{
            _id: unknown;
          }>)
      | null,
    count: number
  ): Promise<boolean> => {
    try {
      if (!document) {
        throw "document is undefined";
      }
      await userModel.findByIdAndUpdate(
        document._id,
        {
          emailConfirmationAttempts: count,
          updatedDate: new Date(),
        },
        { new: false }
      );
      return true;
    } catch (error: any) {
      console.error(error);
      return false;
    }
  };

  enableEmailconfirmationAsync = async (
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
        document._id,
        {
          isEmailConfirmed: true,
          tokenStatus: TokenStatuses.Accepted,
          updatedDate: new Date(),
        },
        { new: false }
      );
      return true;
    } catch (error: any) {
      console.error(error);
      return false;
    }
  };

  revokeTokenAsync = async (
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
        document._id,
        {
          tokenStatus: TokenStatuses.Expired,
          updatedDate: new Date(),
        },
        { new: false }
      );
      return true;
    } catch (error: any) {
      console.error(error);
      return false;
    }
  };
}
