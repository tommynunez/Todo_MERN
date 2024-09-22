import { NextFunction, Request, Response, Router } from 'express';
import UserService from '../services/userService';
import passport from 'passport';

const router: Router = Router();
const userService = new UserService();

router.post(
	'/authentication/signup',
	async (_request: Request, _response: Response) => {
		try {
			const hasErrors = userService.validateSignupFields(_request, _response);

			if (hasErrors) {
				return;
			}

			const userWasregistered = await userService.signup(
				_request.body.emailAddress,
				_request.body.password
			);

			if (userWasregistered) {
				_response.sendStatus(201);
				return;
			} else {
				throw 'User was not created';
			}
		} catch (error) {
			console.log(error);
			_response.status(500).json({ errmsg: error?.toString() });
		}
	}
);

router.post(
	'/authentication/signin',
	passport.authenticate(
		'local',
		function (request: Request, response: Response, next: NextFunction) {
			passport.authenticate(
				'local',
				function (error: any, user: any, info: any, status: any) {
					if (error) {
						return next(error);
					}
					if (!user) {
						return response.status(401).json({ errmsg: info, status: status });
					}
					return response.sendStatus(200);
				}
			)(request, response, next);
		}
	)
);

router.post(
	'authentication/logout',
	(_request: Request, _response: Response, next: NextFunction) => {
		_request.logout(function (error: any) {
			if (error) {
				return next(error);
			}
			_response.sendStatus(200);
		});
	}
);

export default router;
