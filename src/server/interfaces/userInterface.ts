import mongoose from 'mongoose';
import { IService } from './service';

export interface IUserAccount extends mongoose.Document {
  emailAddress: string;
  password: string;
  salt: string;
  tokenStatus: string;
  token: string;
  isEmailConfirmed: boolean;
  emailConfirmationAttempts: number;
  loginAttempts: number;
  isLockedOut: boolean;
  lastSignedIn: Date;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date;
}

export interface IAuthenticatedUser {
  _id: string;
  emailAddress: string;
  isEmailConfirmed: boolean;
}

export interface IUserService extends IService {
  signup: (emailAddress: string, password: string) => Promise<boolean>;
  signin: (
    emailAddress: string,
    password: string,
    user: any,
  ) => Promise<boolean>;
  getUserAccountByEmailAddressAsync: (
    emailAddress: string,
  ) => Promise<IUserAccount | null>;
  getUserbyEmailAddressAsync: (
    emailAddress: string,
  ) => Promise<IAuthenticatedUser | null>;
  confirmEmailAsync: (emailAddress: string, token: string) => Promise<boolean>;
  sendForgotpasswordEmailAsync: (emailAddress: string) => Promise<boolean>;
  resetPasswordAsync: (
    emailAddress: string,
    token: string,
    password: string,
    confirmPassword: string,
  ) => Promise<[success: boolean, authenticatedUser: IAuthenticatedUser]>;
}
