import mongoose from 'mongoose';
import { userModel } from '../models/userModel';
import { IUserAccount } from '../interfaces/userInterface';
import { TokenStatuses } from '../constants/TokenStatuses';

export class UserRepository {
  constructor() {}

  /**
   * Inserts a new user account document into the database
   * @param emailAddress - The user's email address (unique)
   * @param password - The hashed password
   * @param salt - The salt used for password hashing
   * @param tokenStatus - The current status of the email confirmation token
   * @param token - The email confirmation token (optional)
   * @param isEmailConfirmed - Whether the email has been confirmed (default: false)
   * @returns Promise resolving to the created Document if successful
   * @throws Error if email already exists (code 11000) or other database error
   * @async
   */
  insertUseraccountAsync = async (
    emailAddress: string,
    password: string,
    salt: string,
    tokenStatus: string,
    token?: string,
    isEmailConfirmed: boolean = false,
  ): Promise<IUserAccount | undefined> => {
    try {
      const user = new userModel({
        emailAddress,
        password,
        salt,
        tokenStatus,
        isEmailConfirmed,
        token: token || '',
        createdDate: Date.now(),
        updatedDate: Date.now(),
      });
      await user.save();
      return user;
    } catch (error: any) {
      if (error.errorResponse.code === 11000) {
        throw new Error('Please try a different emailAddress');
      } else {
        throw new Error('We could not create account. Please try again.');
      }
    }
  };

  /**
   * Retrieves a user account by email address
   * @param emailAddress - The email address to search for
   * @returns Promise resolving to the IUserAccount document if found, null otherwise
   * @throws Will not throw but returns null if database error occurs
   * @async
   */
  getUserbyEmailAddressAsync = async (
    emailAddress: string,
  ): Promise<
    | (mongoose.Document<unknown, IUserAccount> &
        IUserAccount &
        Required<{
          _id: unknown;
        }>)
    | null
  > => {
    try {
      const document = await userModel.findOne({ emailAddress });
      return document;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  };

  /**
   * Retrieves a user account by verification token
   * @param token - The token to search for
   * @returns Promise resolving to the IUserAccount document if found, null otherwise
   * @throws Will not throw but returns null if database error occurs
   * @async
   */
  getUserbyTokenAsync = async (
    token: string,
  ): Promise<
    | (mongoose.Document<unknown, IUserAccount> &
        IUserAccount &
        Required<{
          _id: unknown;
        }>)
    | null
  > => {
    try {
      const document = await userModel.findOne({ token });
      return document;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  };

  /**
   * Updates the last login timestamp and resets login attempt counter
   * @param document - The user document to update
   * @returns Promise resolving to true if update successful, false otherwise
   * @throws Will not throw but returns false if document is undefined or database error occurs
   * @async
   */
  updateLastLoggedInAsync = async (
    document:
      | (mongoose.Document<unknown, IUserAccount> &
          IUserAccount &
          Required<{
            _id: unknown;
          }>)
      | null,
  ): Promise<boolean> => {
    try {
      if (!document) {
        throw 'document is undefined';
      }
      await userModel.findByIdAndUpdate(
        document._id,
        {
          loginAttempts: 0,
          lastSignedIn: new Date(),
          updatedDate: new Date(),
        },
        { new: false },
      );
      return true;
    } catch (error: any) {
      console.error(error);
      return false;
    }
  };

  /**
   * Increments login attempt counter and locks account if threshold exceeded
   * @param document - The user document to update
   * @returns Promise resolving to true if update successful, false otherwise
   * @throws Will not throw but returns false if document is undefined or database error occurs
   * @async
   */
  updateLoginCountAsync = async (
    document:
      | (mongoose.Document<unknown, IUserAccount> &
          IUserAccount &
          Required<{
            _id: unknown;
          }>)
      | null,
  ): Promise<boolean> => {
    try {
      if (!document) {
        throw 'document is undefined';
      }

      const loginAttempts = document.loginAttempts + 1;

      await userModel.findByIdAndUpdate(
        document._id,
        {
          loginAttempts,
          isLockedOut: loginAttempts >= 3,
          updatedDate: new Date(),
        },
        { new: false },
      );
      return true;
    } catch (error: any) {
      console.error(error);
      return false;
    }
  };

  /**
   * Resets a user's password and clears account lockout state
   * @param document - The user document to update
   * @param hashedPassword - The new hashed password
   * @param salt - The new salt for the password
   * @returns Promise resolving to true if update successful, false otherwise
   * @throws Will not throw but returns false if document is undefined or database error occurs
   * @async
   */
  resetPasswordAsync = async (
    document:
      | (mongoose.Document<unknown, IUserAccount> &
          IUserAccount &
          Required<{
            _id: unknown;
          }>)
      | null,
    hashedPassword: string,
    salt: string,
  ): Promise<boolean> => {
    try {
      if (!document) {
        throw 'document is undefined';
      }
      await userModel.findByIdAndUpdate(
        document._id,
        {
          password: hashedPassword,
          salt,
          loginAttempts: 0,
          isLockedOut: false,
          updatedDate: new Date(),
        },
        { new: false },
      );
      return true;
    } catch (error: any) {
      console.error(error);
      return false;
    }
  };

  /**
   * Updates the email confirmation attempt counter
   * @param document - The user document to update
   * @param count - The number of confirmation attempts
   * @returns Promise resolving to true if update successful, false otherwise
   * @throws Will not throw but returns false if document is undefined or database error occurs
   * @async
   */
  updateEmailconfirmedCountAsync = async (
    document:
      | (mongoose.Document<unknown, IUserAccount> &
          IUserAccount &
          Required<{
            _id: unknown;
          }>)
      | null,
    count: number,
  ): Promise<boolean> => {
    try {
      if (!document) {
        throw 'document is undefined';
      }
      await userModel.findByIdAndUpdate(
        document._id,
        {
          emailConfirmationAttempts: count,
          updatedDate: new Date(),
        },
        { new: false },
      );
      return true;
    } catch (error: any) {
      console.error(error);
      return false;
    }
  };

  /**
   * Marks a user's email as confirmed in the database
   * @param document - The user document to update
   * @returns Promise resolving to true if update successful, false otherwise
   * @throws Will not throw but returns false if document is undefined or database error occurs
   * @async
   */
  enableEmailconfirmationAsync = async (
    document:
      | (mongoose.Document<unknown, IUserAccount> &
          IUserAccount &
          Required<{
            _id: unknown;
          }>)
      | null,
  ): Promise<boolean> => {
    try {
      if (!document) {
        throw 'document is undefined';
      }
      await userModel.findByIdAndUpdate(
        document._id,
        {
          isEmailConfirmed: true,
          tokenStatus: TokenStatuses.Accepted,
          updatedDate: new Date(),
        },
        { new: false },
      );
      return true;
    } catch (error: any) {
      console.error(error);
      return false;
    }
  };

  /**
   * Revokes a user's token by setting status to expired
   * @param document - The user document to update
   * @returns Promise resolving to true if update successful, false otherwise
   * @throws Will not throw but returns false if document is undefined or database error occurs
   * @async
   */
  revokeTokenAsync = async (
    document:
      | (mongoose.Document<unknown, IUserAccount> &
          IUserAccount &
          Required<{
            _id: unknown;
          }>)
      | null,
  ): Promise<boolean> => {
    try {
      if (!document) {
        throw 'document is undefined';
      }
      await userModel.findByIdAndUpdate(
        document._id,
        {
          tokenStatus: TokenStatuses.Expired,
          updatedDate: new Date(),
        },
        { new: false },
      );
      return true;
    } catch (error: any) {
      console.error(error);
      return false;
    }
  };

  /**
   * Checks if a user's account is locked due to failed login attempts
   * @param document - The user document to check
   * @returns Promise resolving to true if account is locked, false otherwise
   * @throws Will not throw but returns false if document is undefined or database error occurs
   * @async
   */
  isAccountLockedOutAsync = async (
    document:
      | (mongoose.Document<unknown, IUserAccount> &
          IUserAccount &
          Required<{
            _id: unknown;
          }>)
      | null,
  ): Promise<boolean> => {
    try {
      if (!document) {
        throw 'document is undefined';
      }
      const user = await userModel.findById(document._id);
      return user?.isLockedOut || false;
    } catch (error: any) {
      console.error(error);
      return false;
    }
  };

  /**
   * Updates or creates a new token for the user
   * @param document - The user document to update
   * @param token - The new token value
   * @returns Promise resolving to true if update successful, false otherwise
   * @throws Will not throw but returns false if document is undefined or database error occurs
   * @async
   */
  updatetokenAsync = async (
    document:
      | (mongoose.Document<unknown, IUserAccount> &
          IUserAccount &
          Required<{
            _id: unknown;
          }>)
      | null,
    token: string,
  ): Promise<boolean> => {
    try {
      if (!document) {
        throw 'document is undefined';
      }
      await userModel.findByIdAndUpdate(
        document._id,
        {
          token,
          updatedDate: new Date(),
        },
        { new: false },
      );
      return true;
    } catch (error: any) {
      console.error(error);
      return false;
    }
  };
}
