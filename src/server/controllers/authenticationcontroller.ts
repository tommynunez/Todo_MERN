import { NextFunction, Request, Response, Router } from 'express';
import { model } from 'mongoose';
import { IUserAccount } from '../models/user/UserInterfaces';
import * as crypto from 'crypto';
import { insertUseraccountAsync } from '../models/database/documents/user';

const router: Router = Router();

export const userAccountModel = model<IUserAccount>('UserAccount');

router.post(
	'/signup',
	async (request: Request, response: Response, next: NextFunction) => {
		const salt = crypto.randomBytes(16);

		crypto.pbkdf2(
			request.body.password,
			salt,
			310000,
			32,
			'sha256',
			async (error: any) => {
				if (error) {
					return next(error);
				}
				await insertUseraccountAsync(
					request.body.username,
					request.body.password,
					salt.toString()
				);
			}
		);
	}
);
