import { Request, Response, Router } from 'express';
import { model } from 'mongoose';
import { IUserAccount } from '../interfaces/userInterface';
import UserService from '../services/userService';

const router: Router = Router();
const userService = new UserService();

export const userAccountModel = model<IUserAccount>('UserAccount');

router.post(
	'/authentication/signup',
	async (_request: Request, _response: Response) => {
		try {
			userService.validateSignupFields(_request, _response);

			const userWasregistered = await userService.signup(
				_request.body.emailAddress,
				_request.body.password
			);

			if (userWasregistered) {
				_response.sendStatus(201);
			} else {
				throw 'User was not created';
			}
		} catch (error) {
			_response.status(500).json({ errmsg: error });
		}
	}
);

router.post(
	'/authentication/signin',
	async (_request: Request, _response: Response) => {
		try {
			const user = await userService.getUserbyEmailAddressAsync(
				_request.body.emailAddress
			);

			if (!user) {
				return _response
					.status(401)
					.json({
						errmsg: 'Email address or password is incorrect!',
					})
					.end();
			}

			const isUserauthenticated = await userService.signin(
				_request.body.emailAddress,
				_request.body.password,
				user
			);

			if (isUserauthenticated) {
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
