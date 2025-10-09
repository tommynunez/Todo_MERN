import { NextFunction, Request, Response, Router } from 'express';
import UserService from '../services/userService';
import passport from 'passport';

const router: Router = Router();
const userService = new UserService();

router.post(
	'/signup',
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
	'/signin',
	(_request: Request, _response: Response, _next: NextFunction) => {
		passport.authenticate(
			'local',
			{ session: true },
			(
				err: any,
				user?: Express.User | false | null,
			) => {
				if (err) {
					return _next(err);
				}
				if (!user) {
					return _response.sendStatus(401);
				} else {
					return _response.sendStatus(200);
				}
			}
		)(_request, _response, _next);
	}
);

router.post(
	'/logout',
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
