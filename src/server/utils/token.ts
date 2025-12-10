import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { Role } from "../constants/Roles";
import { InvitePayload } from "../interfaces/inviteInterface";
import { TokenStatuses } from "../constants/TokenStatuses";
import { InviteType } from "../constants/InviteType";

export const generateInviteToken = (
  listId: Types.ObjectId,
  email: string,
  role: Role,
  type: InviteType,
  jwtSecret?: string
): string => {
  if (!jwtSecret) {
    throw new Error("JWT secret is not defined");
  }

  return jwt.sign(
    {
      listId,
      email,
      role,
      type,
    },
    jwtSecret,
    { expiresIn: "48h" }
  );
};

export const generateEmailConfirmationToken = (
  email: string,
  jwtSecret?: string
): string => {
  if (!jwtSecret) {
    throw new Error("JWT secret is not defined");
  }

  return jwt.sign(
    {
      email,
    },
    jwtSecret,
    { expiresIn: "48h" }
  );
};

export const verifyToken = (
  token: string,
  jwtSecret: string
): InvitePayload => {
  if (!jwtSecret) {
    throw new Error("JWT secret is not defined");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded as InvitePayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.log("The invite token has expired");
      return { status: TokenStatuses.Expired } as InvitePayload;
    } else {
      console.log("An error occurred while verifying the invite token:", error);
      return { status: TokenStatuses.Revoked } as InvitePayload;
    }
  }
};
