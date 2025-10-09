import { IVerifyOptions, Strategy as LocalStrategy } from 'passport-local';
import UserService from "../services/userService";
import passport, { PassportStatic } from 'passport';
import { Express } from 'express';

export type PassportCallBackFunction = (
    error: any,
    user?: Express.User | false,
    options?: IVerifyOptions
) => void;

export type ConfigureOptions = {
  app: Express;
  passportInstance?: PassportStatic;
  userModel?: any; // replace with your User type
};

export const configurePassport = (configOptions: ConfigureOptions) => {
    const app = configOptions.app;
    const passportInstance = configOptions.passportInstance || passport;
    const userService = configOptions.userModel || UserService;
    
    passportInstance.use(
	  new LocalStrategy(
		{
			usernameField: 'emailAddress',
			passwordField: 'password',
			session: true,
		},
		async function verify(
			usernameField: string,
			passwordField: string,
			cb: PassportCallBackFunction
		) {
			try {
				const userService = new UserService();
				const user = await userService.getUserbyEmailAddressAsync(
					usernameField
				);
				if (!user) {
					return cb(null, false, {
						message: 'Incorrect email address or password.',
					});
				}

				const isUserauthenticated = await userService.signin(
					usernameField,
					passwordField,
					user
				);
				
				if (isUserauthenticated) {
					return cb(null, user);
				} else {
					return cb(null, false, {
						message: 'Email address or password is incorrect!',
					});
				}
			} catch (error) {
				return cb(error);
			}
		}
    ));

    passportInstance.serializeUser(function (user: any, cb) {
        process.nextTick(function () {
			cb(null, user.emailAddress);
        });
    });
    
    passportInstance.deserializeUser(async function (user: any, cb) {
        const userFound = await userService.getUserbyEmailAddressAsync(
            user.emailAddress
        );
        if (!userFound) {
            return cb('User not found', userFound);
        }
        return cb(null, userFound);
    });
    
    app.use(passport.initialize());
    app.use(passport.session());

	console.log('Passport has been configured');
    return passportInstance;
}
