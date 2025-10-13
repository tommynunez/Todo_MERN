import jwt from "jsonwebtoken";
import { Schema } from "mongoose";
import { RoleType } from "../constants/Roles";
import { InvitePayload } from "../interfaces/inviteInterface";

export const generateInviteToken = async (
  listId: Schema.Types.ObjectId,
  email: string,
  role: RoleType
): Promise<string> => {
  if (!process.env.NODE_INVITE_JWT_SECRET) {
    throw new Error("JWT secret is not defined");
  }

  const token = jwt.sign(
    {
      listId,
      email,
      role,
    },
    process.env.NODE_INVITE_JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
};

export const verifyInviteToken = async (
  token: string
): Promise<string | InvitePayload | boolean> => {
  if (!process.env.NODE_INVITE_JWT_SECRET) {
    throw new Error("JWT secret is not defined");
  }

  try {
    const decoded = jwt.verify(token, process.env.NODE_INVITE_JWT_SECRET);
    return decoded as InvitePayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.log("The invite token has expired");
    } else if (error instanceof jwt.JsonWebTokenError) {
      console.log("The invite token is invalid");
    } else {
      console.log("An error occurred while verifying the invite token:", error);
    }
    return false;
  }
};
