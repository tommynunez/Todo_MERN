import { Request, Response, Router } from 'express';
import { model } from 'mongoose';
import { IUserAccount } from '../interfaces/userInterface';
import {
	doesUserbyEmailAddressAsync,
	insertUseraccountAsync,
	getUserbyEmailAddressAsync,
	updateLastLoggedInAsync,
} from '../models/userModel';
import * as crypto from 'crypto';

const router: Router = Router();

export const userAccountModel = model<IUserAccount>('UserAccount');

const emailRegex =
	"/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/";

const passwordRegex =
	'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';

router.post(
	'/authentication/signup',
	async (_request: Request, _response: Response) => {
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

		const salt = crypto.randomBytes(64);
		const hashedPassword = await crypto.pbkdf2Sync(
			_request.body.password,
			salt,
			10000,
			64,
			'sha512'
		);

		try {
			await insertUseraccountAsync(
				_request.body.emailAddress,
				hashedPassword.toString(),
				salt.toString()
			);
			_response.sendStatus(201);
		} catch (error) {
			_response.status(500).json({ errmsg: error });
		}
	}
);

router.post(
	'/authentication/signin',
	async (_request: Request, _response: Response) => {
		try {
			const user = await getUserbyEmailAddressAsync(_request.body.emailAddress);

			if (!user) {
				return _response
					.status(401)
					.json({
						errmsg: 'Email address or password is incorrect!',
					})
					.end();
			}

			const salt = crypto.randomBytes(64);
			const hashedPassword = await crypto.pbkdf2Sync(
				_request.body.password,
				salt,
				10000,
				64,
				'sha512'
			);
			if (
				_request.body.emailAddress == user?.emailAddress &&
				hashedPassword.toString() == user.password
			) {
				await updateLastLoggedInAsync(user);
				_response.sendStatus(200);
			} else {
				_response.status(401).json({
					errmsg: 'Email address or password is incorrect!',
				});
			}
		} catch (error) {
			_response.sendStatus(401);
		}
	}
);
export default router;
