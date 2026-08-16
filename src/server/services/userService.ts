import * as crypto from 'crypto';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import {
  IAuthenticatedUser,
  IUserAccount,
  IUserService,
} from '../interfaces/userInterface';
import { UserRepository } from '../repositories/userRepository';
import { emailRegex, passwordRegex } from '../utils/regex';
import { generateUserToken, verifyInviteToken } from '../utils/token';
import { sendEmail } from '../infrastructure/email/maileroo.wraper';
import { TokenStatuses } from '../constants/TokenStatuses';

export default class UserService implements IUserService {
  constructor(private userRepository: UserRepository) {}

  // #region Public Methods
  /**
   * Registers a new user account with email and password
   * @param emailAddress - The email address for the new user account
   * @param password - The password for the account (should be validated before calling)
   * @returns Promise resolving to true if signup successful, false otherwise
   * @throws May throw Error if email is already registered or if email send fails
   * @async
   */
  signup = async (emailAddress: string, password: string): Promise<boolean> => {
    const salt = crypto.randomBytes(64).toString('hex');
    const hashedPassword = await crypto
      .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
      .toString('hex');

    const token = await generateUserToken(
      emailAddress,
      process.env.NODE_USER_JWT_SECRET,
    );
    const document = await this.userRepository.insertUseraccountAsync(
      emailAddress,
      hashedPassword,
      salt,
      TokenStatuses.Pending,
      token,
    );

    if (!document) {
      return false;
    }

    await sendEmail('CONFIRM_EMAIL', emailAddress, {
      userName: emailAddress,
      confirmationLink: `https://yourapp.com/confirm/email?token=${token}`,
    });
    return true;
  };

  /**
   * Authenticates a user by verifying email and password
   * @param emailAddress - The email address of the user attempting to sign in
   * @param password - The password provided by the user
   * @param user - The user document retrieved from database or null
   * @returns Promise resolving to true if authentication successful, false otherwise
   * @throws Will not throw but returns false if credentials are invalid
   * @async
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
      | null,
  ): Promise<boolean> => {
    // const salt = crypto.randomBytes(64);
    const hashedPassword = await crypto
      .pbkdf2Sync(password, user?.salt || '', 100000, 64, 'sha512')
      .toString('hex');

    if (!user) {
      return false;
    }

    if (
      emailAddress === user?.emailAddress &&
      hashedPassword.toString() === user.password
    ) {
      await this.userRepository.updateLastLoggedInAsync(user);
      return true;
    }
    await this.userRepository.updateLoginCountAsync(user);
    // check if user is locked out
    await this.sendAccountLockedoutEmailAsync(user);
    return false;
  };

  /**
   * Validates signup form fields from the request body
   * @param _request - Express request object containing body data
   * @param _response - Express response object for sending validation errors
   * @returns Boolean - true if there are validation errors, false if all fields are valid
   * @throws Will not throw but returns validation errors via response
   * @todo This should be converted to middleware for the signup route endpoint
   */
  validateSignupFields = (_request: Request, _response: Response): boolean => {
    if (!_request.body.emailAddress && _request.body.emailAddress.match()) {
      _response.status(400).json({ errmsg: 'Please enter a username' });
      return true;
    }

    if (!emailRegex.test(_request.body.emailAddress)) {
      _response.status(400).json({ errmsg: 'Please enter a valid username' });
      return true;
    }

    if (!_request.body.password) {
      _response.status(400).json({ errmsg: 'Please enter a password' });
      return true;
    }

    if (!passwordRegex.test(_request.body.password)) {
      _response.status(400).json({ errmsg: 'Please enter a valid password' });
      return true;
    }

    if (!_request.body.confirmPassword) {
      _response.status(400).json({ errmsg: 'Please enter a confirm password' });
      return true;
    }
    if (_request.body.password !== _request.body.confirmPassword) {
      _response
        .status(400)
        .json({ errmsg: 'Password and confirm password do not match' });
      return true;
    }
    return false;
  };

  /**
   * Retrieves a user account by their email address
   * @param emailAddress - The email address to search for
   * @returns Promise resolving to the IAuthenticatedUser document if found, null otherwise
   * @throws Will not throw but returns null if database error occurs
   * @async
   */
  getUserbyEmailAddressAsync = async (
    emailAddress: string,
  ): Promise<IAuthenticatedUser | null> => {
    const user =
      await this.userRepository.getUserbyEmailAddressAsync(emailAddress);

    if (!user) {
      return null;
    }

    return {
      _id: user?._id.toString(),
      emailAddress: user.emailAddress,
      isEmailConfirmed: user.isEmailConfirmed,
    };
  };

  /**
   * Retrieves a user account by their email address
   * @param emailAddress - The email address to search for
   * @returns Promise resolving to the IUserAccount document if found, null otherwise
   * @throws Will not throw but returns null if database error occurs
   * @async
   */
  getUserAccountByEmailAddressAsync = async (
    emailAddress: string,
  ): Promise<IUserAccount | null> =>
    await this.userRepository.getUserbyEmailAddressAsync(emailAddress);

  /**
   * Confirms a user's email address using a verification token
   * @param token - The email confirmation token
   * @returns Promise resolving to true if confirmation successful, false otherwise
   * @throws Error if token is not provided or other errors occur
   * @async
   */
  confirmEmailAsync = async (token: string): Promise<boolean> => {
    if (!token) {
      throw new Error('Token is required.');
    }
    const user = await this.userRepository.getUserbyTokenAsync(token);
    if (user) {
      const isTokenInValid = await this.handleConfirmationtokenAsync(
        token,
        user,
      );
      if (isTokenInValid) {
        console.log('Email confirmation token was successful');
        await this.userRepository.enableEmailconfirmationAsync(user);

        await sendEmail('WELCOME_EMAIL', user.emailAddress, {
          userName: user.emailAddress,
          dashboardLink: 'https://yourapp.com/dashboard',
        });
        return true;
      }
      console.error('Email confirmation token was not successful');
      return false;
    }

    return false;
  };

  /**
   * Sends a password reset email to the user with a reset token
   * @param emailAddress - The email address of the user requesting password reset
   * @returns Promise resolving to true if email sent successfully, false if user not found
   * @throws Will not throw but returns false if user doesn't exist
   * @async
   */
  sendForgotpasswordEmailAsync = async (
    emailAddress: string,
  ): Promise<boolean> => {
    const user =
      await this.userRepository.getUserbyEmailAddressAsync(emailAddress);
    if (user) {
      const token = generateUserToken(
        user.emailAddress,
        process.env.NODE_USER_JWT_SECRET,
      );
      await sendEmail('FORGOT_PASSWORD_EMAIL', user.emailAddress, {
        userName: user.emailAddress,
        resetLink: `https://yourapp.com/reset/password?token=${token}`,
      });

      await this.userRepository.updatetokenAsync(user, token);
      return true;
    }
    return false;
  };

  /**
   * Resets a user's password using a valid reset token
   * @param token - The password reset token
   * @param password - The new password to set
   * @returns Promise resolving to a tuple [success: boolean, user: IUserAccount]
   * @throws Error if user is not found
   * @async
   */
  resetPasswordAsync = async (
    token: string,
    password: string,
  ): Promise<[success: boolean, authenticatedUser: IAuthenticatedUser]> => {
    const user = await this.userRepository.getUserbyTokenAsync(token);

    if (!user) {
      throw new Error('User not found');
    }

    const userAccount = {
      _id: user._id.toString(),
      emailAddress: user.emailAddress,
      isEmailConfirmed: user.isEmailConfirmed,
    } as IAuthenticatedUser;

    const isTokenValid = await this.handleForgotPasswordTokenAsync(token, user);
    if (isTokenValid) {
      const salt = crypto.randomBytes(64).toString('hex');
      const hashedPassword = await crypto
        .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
        .toString('hex');
      await this.userRepository.resetPasswordAsync(user, hashedPassword, salt);

      return [true, userAccount];
    }
    return [false, userAccount];
  };
  // #endregion

  // #region Private Methods
  /**
   * Handle forgot password token method
   * @param token
   * @param user
   * @returns Boolean
   */
  private handleForgotPasswordTokenAsync = async (
    token: string,
    user: IUserAccount,
  ): Promise<boolean> => {
    const decodedToken = await verifyInviteToken(
      token,
      process.env.NODE_USER_JWT_SECRET,
    );

    const isExpiredemailSent = await this.handleExpiredTokenAsync(
      decodedToken,
      user,
    );

    const isRevokedemailSent = await this.handleRevokedTokenAsync(
      decodedToken,
      user,
    );

    if (!isExpiredemailSent || !isRevokedemailSent) {
      const newToken = generateUserToken(
        user.emailAddress,
        process.env.NODE_USER_JWT_SECRET,
      );
      await sendEmail('FORGOT_PASSWORD_EMAIL', user.emailAddress, {
        userName: user.emailAddress,
        resetLink: `https://yourapp.com/reset/password?token=${newToken}`,
      });
      await this.userRepository.updatetokenAsync(user, newToken);
      return false;
    }

    return true;
  };

  /**
   * Handle confirmation token method
   * @param token
   * @param user
   * @returns Boolean
   */
  private handleConfirmationtokenAsync = async (
    token: string,
    user: IUserAccount,
  ): Promise<boolean> => {
    const decodedToken = await verifyInviteToken(
      token,
      process.env.NODE_USER_JWT_SECRET,
    );

    const isExpiredemailSent = await this.handleExpiredTokenAsync(
      decodedToken,
      user,
    );

    const isRevokedemailSent = await this.handleRevokedTokenAsync(
      decodedToken,
      user,
    );

    if (!isExpiredemailSent || !isRevokedemailSent) {
      await this.userRepository.updateEmailconfirmedCountAsync(
        user,
        user.emailConfirmationAttempts + 1,
      );

      const newToken = generateUserToken(
        user.emailAddress,
        process.env.NODE_USER_JWT_SECRET,
      );
      await sendEmail('CONFIRM_EMAIL', user.emailAddress, {
        userName: user.emailAddress,
        confirmationLink: `https://yourapp.com/confirm/email?token=${newToken}`,
      });
      return false;
    }

    return true;
  };

  /**
   * Handle expired token method
   * @param decodedToken
   * @param user
   * @returns Boolean
   */
  private handleExpiredTokenAsync = async (
    decodedToken: any,
    user: IUserAccount,
  ): Promise<boolean> => {
    if (decodedToken.status === TokenStatuses.Expired) {
      await this.userRepository.revokeTokenAsync(user);
      return false;
    }
    return true;
  };

  /**
   * Handle revoked token method
   * @param decodedToken
   * @param user
   * @returns Boolean
   */
  private handleRevokedTokenAsync = async (
    decodedToken: any,
    user: IUserAccount,
  ): Promise<boolean> => {
    if (decodedToken.status === TokenStatuses.Revoked) {
      console.error('Email confirmation token has been revoked');
      await this.userRepository.revokeTokenAsync(user);
      return false;
    }
    return true;
  };

  /**
   * Send account locked out email method
   * @param user
   * @returns Void
   */
  private sendAccountLockedoutEmailAsync = async (
    user:
      | (mongoose.Document<unknown, IUserAccount> &
          IUserAccount &
          Required<{
            _id: unknown;
          }>)
      | null,
  ): Promise<void> => {
    if (!user) {
      return;
    }

    if (await this.userRepository.isAccountLockedOutAsync(user)) {
      console.error('User is locked out due to multiple failed login attempts');

      const token = generateUserToken(
        user.emailAddress,
        process.env.NODE_USER_JWT_SECRET,
      );

      await sendEmail('ACCOUNT_LOCKED_EMAIL', user.emailAddress, {
        userName: user.emailAddress,
        resetLink: `https://yourapp.com/confirm/email?token=${token}`,
      });
    }
  };
  // #endregion
}
