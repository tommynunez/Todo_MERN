import { NextFunction, Request, Response } from "express";
import { IUserAccount } from "../interfaces/userInterface";

/**
 * Middleware to check if user's email is confirmed
 * @param _request
 * @param _response
 * @param _next
 * @returns 403 if email not confirmed, otherwise calls next()
 */
export function emailConfirmationMiddleware(
  _request: Request,
  _response: Response,
  _next: NextFunction
) {
  const user = _request?.user as IUserAccount;
  if (user && !user.isEmailConfirmed) {
    return _response.status(403).json({
      errmsg: "Email address has not been confirmed.",
    });
  }
  return _next();
}
