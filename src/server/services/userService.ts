import * as crypto from "crypto";
import { Request, Response } from "express";
import { IUserAccount, IUserService } from "../interfaces/userInterface";
import { UserRepository } from "../repositories/userRepository";
import { emailRegex, passwordRegex } from "../utils/regex";
import mongoose from "mongoose";
import { generateUserToken, verifyToken } from "../utils/token";
import { sendEmail } from "../infrastructure/email/maileroo.wraper";
import { TokenStatuses } from "../constants/TokenStatuses";

export default class UserService implements IUserService {
  constructor(private userRepository: UserRepository) {}

  /**
   * Method to signup a user
   * @param emailAddress
   * @param password
   * @returns Boolean
   */
  signup = async (emailAddress: string, password: string): Promise<boolean> => {
    const salt = crypto.randomBytes(64).toString("hex");
    const hashedPassword = await crypto
      .pbkdf2Sync(password, salt, 100000, 64, "sha512")
      .toString("hex");

    const token = await generateUserToken(
      emailAddress,
      process.env.NODE_USER_JWT_SECRET
    );
    const document = await this.userRepository.insertUseraccountAsync(
      emailAddress,
      hashedPassword,
      salt,
      TokenStatuses.Pending,
      token
    );

    if (!document) {
      return false;
    }

    await sendEmail("CONFIRM_EMAIL", emailAddress, {
      userName: emailAddress,
      confirmationLink: `https://yourapp.com/confirm/email?token=${token}`,
    });
    return true;
  };

  /**
   * Method to signin a user
   * @param emailAddress
   * @param password
   * @param user
   * @returns Boolean
   */
  signin = async (
    emailAddress: string,
    password: string,
    user:
      | (mongoose.Document<unknown, IUserAccount> &
          IUserAccount &
          Required<{
            _id: unknown;
          }>)
      | null
  ): Promise<boolean> => {
    //const salt = crypto.randomBytes(64);
    const hashedPassword = await crypto
      .pbkdf2Sync(password, user?.salt || "", 100000, 64, "sha512")
      .toString("hex");

    if (
      emailAddress == user?.emailAddress &&
      hashedPassword.toString() == user.password
    ) {
      await this.userRepository.updateLastLoggedInAsync(user);
      return true;
    } else {
      return false;
    }
  };

  // todo: make this a middleware for the signup route endpoint
  validateSignupFields = (_request: Request, _response: Response): boolean => {
    if (!_request.body.emailAddress && _request.body.emailAddress.match()) {
      _response.status(400).json({ errmsg: "Please enter a username" });
      return true;
    }

    if (emailRegex.match(_request.body.emailAddress)) {
      _response.status(400).json({ errmsg: "Please enter a valid username" });
      return true;
    }

    if (!_request.body.password) {
      _response.status(400).json({ errmsg: "Please enter a password" });
      return true;
    }

    if (passwordRegex.match(_request.body.password)) {
      _response.status(400).json({ errmsg: "Please enter a valid passwword" });
      return true;
    }

    if (!_request.body.confirmPassword) {
      _response.status(400).json({ errmsg: "Please enter a confirm password" });
      return true;
    }
    if (_request.body.password !== _request.body.confirmPassword) {
      _response
        .status(400)
        .json({ errmsg: "Password and confirm password do not match" });
      return true;
    }

    return false;
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
  > => await this.userRepository.getUserbyEmailAddressAsync(emailAddress);

  confirmEmailAsync = async (token: string): Promise<boolean> => {
    if (!token) {
      throw new Error("Token is required.");
    }
    const user = await this.userRepository.getUserbyTokenAsync(token);
    if (user) {
      const isTokenInValid = await this.handleTokenAsync(token, user);
      if (isTokenInValid) {
        console.log("Email confirmation token was successful");
        user.isEmailConfirmed = true;
        user.tokenStatus = TokenStatuses.Accepted;
        await user.save();

        await sendEmail("WELCOME_EMAIL", user.emailAddress, {
          userName: user.emailAddress,
          dashboardLink: `https://yourapp.com/dashboard`,
        });
        return true;
      } else {
        console.error("Email confirmation token was not successful");
        return false;
      }
    }

    return false;
  };

  sendForgotpasswordEmailAsync = async (
    emailAddress: string
  ): Promise<boolean> => {
    const user = await this.userRepository.getUserbyEmailAddressAsync(
      emailAddress
    );
    if (user) {
      const token = generateUserToken(
        user.emailAddress,
        process.env.NODE_USER_JWT_SECRET
      );
      await sendEmail("FORGOT_PASSWORD_EMAIL", user.emailAddress, {
        userName: user.emailAddress,
        resetLink: `https://yourapp.com/reset/password?token=${token}`,
      });
      return true;
    }
    return false;
  };

  resetPasswordAsync = async (
    token: string,
    password: string
  ): Promise<[success: boolean, user: IUserAccount]> => {
    const decodedToken = await verifyToken(
      token,
      process.env.NODE_USER_JWT_SECRET
    );

    const user = await this.userRepository.getUserbyEmailAddressAsync(
      decodedToken.email
    );

    if (!user) {
      throw new Error("User not found");
    }

    const isExpiredemailSent = await this.handleExpiredTokenAsync(
      decodedToken,
      user
    );
    const isRevokedemailSent = await this.handleRevokedTokenAsync(
      decodedToken,
      user
    );

    if (!isExpiredemailSent || !isRevokedemailSent) {
      return [false, user];
    }

    const salt = crypto.randomBytes(64).toString("hex");
    const hashedPassword = await crypto
      .pbkdf2Sync(password, salt, 100000, 64, "sha512")
      .toString("hex");

    user.password = hashedPassword;
    user.salt = salt;
    await user.save();

    return [true, user];
  };

  private handleTokenAsync = async (
    token: string,
    user: IUserAccount
  ): Promise<Boolean> => {
    const decodedToken = await verifyToken(
      token,
      process.env.NODE_USER_JWT_SECRET
    );

    const isExpiredemailSent = await this.handleExpiredTokenAsync(
      decodedToken,
      user
    );

    const isRevokedemailSent = await this.handleRevokedTokenAsync(
      decodedToken,
      user
    );

    if (!isExpiredemailSent || !isRevokedemailSent) {
      user.emailConfirmationAttempts += 1;
      await user.save();
      return false;
    }

    return true;
  };

  private handleExpiredTokenAsync = async (
    decodedToken: any,
    user: IUserAccount
  ): Promise<Boolean> => {
    if (decodedToken.status === TokenStatuses.Expired) {
      user.tokenStatus = TokenStatuses.Expired;
      await user.save();

      const newToken = generateUserToken(
        user.emailAddress,
        process.env.NODE_USER_JWT_SECRET
      );
      await sendEmail("CONFIRM_EMAIL", user.emailAddress, {
        userName: user.emailAddress,
        confirmationLink: `https://yourapp.com/confirm/email?token=${newToken}`,
      });
      return false;
    }
    return true;
  };

  private handleRevokedTokenAsync = async (
    decodedToken: any,
    user: IUserAccount
  ): Promise<Boolean> => {
    if (decodedToken.status === TokenStatuses.Revoked) {
      console.error("Email confirmation token has been revoked");
      user.tokenStatus = TokenStatuses.Revoked;
      await user.save();
      return false;
    }
    return true;
  };
}
