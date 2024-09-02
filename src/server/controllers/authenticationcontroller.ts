import { NextFunction, Request, Response, Router } from 'express';
import { model } from 'mongoose';
import { IUserAccount } from '../models/user/UserInterfaces';
import * as crypto from 'crypto';
import { insertUseraccountAsync } from '../models/database/documents/user';

const router: Router = Router();

export const userAccountModel = model<IUserAccount>('UserAccount');

router.post(
	'/authentication/signup',
	async (_request: Request, _response: Response, next: NextFunction) => {
		const salt = crypto.randomBytes(16);
		crypto.pbkdf2(
			_request.body.password,
			salt,
			310000,
			32,
			'sha256',
			async (error: any, hashedPassword: Buffer) => {
				if (error) {
					return next(error);
				}
				try {
					await insertUseraccountAsync(
						_request.body.username,
						hashedPassword.toString(),
						salt.toString()
					);
					_response.sendStatus(201);
				} catch (error) {
					_response.status(500).json({ errmsg: error });
				}
			}
		);
	}
);

export default router;
