import { NextFunction, Request, Response, Router } from 'express';
import UserService from '../services/userService';
import passport from 'passport';
import { IVerifyOptions, Strategy as LocalStrategy } from 'passport-local';

const router: Router = Router();
const userService = new UserService();

type PassPortCallBackFunction = (
	error: any,
	user?: Express.User | false,
	options?: IVerifyOptions
) => void;

passport.use(
	new LocalStrategy(async function verify(
		username: string,
		password: string,
		cb: PassPortCallBackFunction
	) {
		const user = await userService.getUserbyEmailAddressAsync(username);
		if (!user) {
			return cb(null, false, { message: 'Incorrect username or password.' });
		}

		const isUserauthenticated = await userService.signin(
			username,
			password,
			user
		);

		if (isUserauthenticated) {
			cb(null, user);
		} else {
			cb(null, false, {
				message: 'Email address or password is incorrect!',
			});
		}
	})
);

passport.serializeUser(function (user: any, cb) {
	process.nextTick(function () {
		cb(null, { id: user.id, username: user.username });
	});
});

passport.deserializeUser(function (user: Express.User, cb) {
	process.nextTick(function () {
		return cb(null, user);
	});
});

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
						return response
							.status(401)
							.json({ errmsg: info, status: status })
							.end();
					}
					response.status(200).end();
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
			_response.redirect('/');
		});
	}
);

export default router;
