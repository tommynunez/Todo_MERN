import { NextFunction, Request, Response, Router } from 'express';
import { model } from 'mongoose';
import { IUserAccount } from '../models/user/UserInterfaces';
import {
	doesUserbyEmailAddressAsync,
	insertUseraccountAsync,
	getUserbyEmailAddressAsync,
	updateLastLoggedInAsync,
} from '../models/database/documents/user';
import { encryptPassword } from '../helpers/encryptionHelper';

const router: Router = Router();

export const userAccountModel = model<IUserAccount>('UserAccount');

const emailRegex =
	"/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/";

const passwordRegex =
	'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';

router.post(
	'/authentication/signup',
	async (_request: Request, _response: Response, next: NextFunction) => {
		if (!_request.body.emailAddress && _request.body.emailAddress.match()) {
			_response.send(400).json({ errmsg: 'Please enter a username' });
		}

		if (emailRegex.match(_request.body.emailAddress)) {
			_response.send(400).json({ errmsg: 'Please enter a valid username' });
		}

		if (!_request.body.password) {
			_response.send(400).json({ errmsg: 'Please enter a password' });
		}

		if (passwordRegex.match(_request.body.password)) {
			_response.send(400).json({ errmsg: 'Please enter a valid passwword' });
		}

		if (!_request.body.confirmPassword) {
			_response.send(400).json({ errmsg: 'Please enter a confirm password' });
		}

		if (_request.body.password === _request.body.confirmPassword) {
			_response
				.send(400)
				.json({ errmsg: 'Password and confirm password do not match' });
		}

		//validate EmailAddress
		const doesEmailAddressexists = await doesUserbyEmailAddressAsync(
			_request.body.emailAddress
		);
		if (doesEmailAddressexists) {
			_response
				.send(500)
				.json({ errmsg: 'Please try a different EmailAddress' });
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
						_request.body.emailAddress,
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
	'/authentication/signin',
	async (_request: Request, _response: Response, next: NextFunction) => {
		try {
			const user = await getUserbyEmailAddressAsync(_request.body.emailAddress);

			if (!user) {
				return _response
					.status(401)
					.json({
						errmsg: 'Email address or password is incorrect!',
					})
					.end();
				next();
			}
			console.log('todo');
			encryptPassword(
				_request.body.password,
				next,
				async (
					error: Error | null,
					next: NextFunction,
					hashedPassword?: Buffer | string | null,
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					salt?: Buffer | string
				): Promise<void> => {
					try {
						if (error) {
							return next(error);
						}
						if (
							_request.body.emailAddress == user?.emailAddress &&
							hashedPassword == user.password
						) {
							await updateLastLoggedInAsync(user);
							_response.sendStatus(200);
						} else {
							_response.status(401).json({
								errmsg: 'Email address or password is incorrect!',
							});
						}
					} catch (error) {
						_response.status(500).json({ errmsg: error });
					}
					next();
				},
				user?.salt
			);

			_response.sendStatus(200);
		} catch (error) {
			_response.sendStatus(401);
		}
	}
);
export default router;
