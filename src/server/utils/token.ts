import jwt from 'jsonwebtoken';
import { Role } from '../constants/Roles';
import {
  IInviteTokenPayload,
  VerifyInviteTokenResult,
} from '../interfaces/inviteInterface';
import { TokenStatuses } from '../constants/TokenStatuses';
import { InviteType } from '../constants/InviteType';

export const generateInviteToken = (
  listId: string,
  email: string,
  role: Role,
  type: InviteType,
  jwtSecret?: string,
): string => {
  if (!jwtSecret) {
    throw new Error('JWT secret is not defined');
  }

  return jwt.sign(
    {
      listId,
      email,
      role,
      type,
    } as IInviteTokenPayload,
    jwtSecret,
    { expiresIn: '48h' },
  );
};

export const generateUserToken = (
  email: string,
  jwtSecret?: string,
): string => {
  if (!jwtSecret) {
    throw new Error('JWT secret is not defined');
  }

  return jwt.sign(
    {
      email,
    },
    jwtSecret,
    { expiresIn: '48h' },
  );
};

export const verifyInviteToken = (
  token: string,
  jwtSecret: string,
): VerifyInviteTokenResult => {
  if (!jwtSecret) {
    throw new Error('JWT secret is not defined');
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as IInviteTokenPayload;
    return {
      status: TokenStatuses.Accepted,
      payload: decoded,
    };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.log('The invite token has expired');
      return {
        status: TokenStatuses.Expired,
      };
    }
    console.log('An error occurred while verifying the invite token:', error);
    return {
      status: TokenStatuses.Revoked,
    } as VerifyInviteTokenResult;
  }
};
