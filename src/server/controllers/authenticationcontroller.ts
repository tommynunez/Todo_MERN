import { NextFunction, Request, Response, Router } from 'express';
import { model } from 'mongoose';
import { IUserAccount } from '../models/user/UserInterfaces';
import {
	doesUserbyUsernameAsync,
	insertUseraccountAsync,
	getUserbyUsernameAsync,
} from '../models/database/documents/user';
import { encryptPassword } from '../helpers/encryptionHelper';

const router: Router = Router();

export const userAccountModel = model<IUserAccount>('UserAccount');

router.post(
	'/authentication/signup',
	async (_request: Request, _response: Response, next: NextFunction) => {
		//validate username
		const doesUsernameexists = await doesUserbyUsernameAsync(
			_request.body.username
		);
		if (doesUsernameexists) {
			_response.send(500).json({ errmsg: 'Please try a different username' });
		}

		//validate password
		encryptPassword(
			_request.body.password,
			next,
			async (
				error: Error | null,
				next: NextFunction,
				hashedPassword: Buffer,
				salt?: Buffer | string
			): Promise<void> => {
				try {
					if (error) {
						return next(error);
					}
					await insertUseraccountAsync(
						_request.body.username,
						hashedPassword.toString(),
						salt as string
					);
					_response.sendStatus(201);
				} catch (error) {
					_response.status(500).json({ errmsg: error });
				}
			}
		);
	}
);

router.post(
	'/authentication',
	async (_request: Request, _response: Response, next: NextFunction) => {
		try {
			const user = await getUserbyUsernameAsync(_request.body.username);

			if (user === null) {
				_response.status(401);
			}

			encryptPassword(
				_request.body.password,
				next,
				async (
					error: Error | null,
					next: NextFunction,
					hashedPassword?: Buffer,
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					salt?: Buffer | string
				): Promise<void> => {
					try {
						if (error) {
							return next(error);
						}
						if (user?.password == hashedPassword) {
							_response.status(200);
						}
						_response.sendStatus(200);
					} catch (error) {
						_response.status(500).json({ errmsg: error });
					}
				},
				user?.salt
			);

			_response.sendStatus(200);
		} catch (error) {
			_response.sendStatus(401);
			next(error);
		}
	}
);
export default router;
