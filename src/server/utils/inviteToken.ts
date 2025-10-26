import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { Role } from "../constants/Roles";
import { InvitePayload } from "../interfaces/inviteInterface";
import { InviteStatuses } from "../constants/InviteStatuses";
import { InviteType } from "../constants/InviteType";

export const generateInviteToken = (
  listId: Types.ObjectId,
  email: string,
  role: Role,
  type: InviteType,
): string => {
  if (!process.env.NODE_INVITE_JWT_SECRET) {
    throw new Error("JWT secret is not defined");
  }

  const token = jwt.sign(
    {
      listId,
      email,
      role,
      type,
    },
    process.env.NODE_INVITE_JWT_SECRET,
    { expiresIn: "1h" },
  );

  return token;
};

export const verifyInviteToken = (token: string): InvitePayload => {
  if (!process.env.NODE_INVITE_JWT_SECRET) {
    throw new Error("JWT secret is not defined");
  }

  try {
    const decoded = jwt.verify(token, process.env.NODE_INVITE_JWT_SECRET);
    return decoded as InvitePayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.log("The invite token has expired");
      return { status: InviteStatuses.Expired } as InvitePayload;
    } else {
      console.log("An error occurred while verifying the invite token:", error);
      return { status: InviteStatuses.Revoked } as InvitePayload;
    }
  }
};
