import { IVerifyOptions, Strategy as LocalStrategy } from "passport-local";
import UserService from "../services/userService";
import passport, { PassportStatic } from "passport";
import { Express } from "express";
import { UserRepository } from "../repositories/userRepository";

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

/**
 * Configures passport with local strategy and session handling
 * @param configOptions
 * @returns
 */
export const configurePassport = (configOptions: ConfigureOptions) => {
  const app = configOptions.app;
  const passportInstance = configOptions.passportInstance || passport;
  const userService =
    configOptions.userModel || new UserService(new UserRepository());

  /**
   * Use the LocalStrategy within Passport.
   * Strategies in passport require a `verify` function, which accept
   * credentials (in this case, a username and password), and invoke a callback
   * with a user object.	In the real world, this would query a database;
   * here, we supply a user object for the given username.
   * Note that the user's password is not checked (see below).
   * In a production-quality application, the password should be hashed
   * and salted, and never stored in plain text.
   * Also, `username` and `password` fields would typically be
   * configured to match the names of the fields in your login form.
   * @param usernameField
   * @param passwordField
   * @param cb
   * @returns
   */
  passportInstance.use(
    new LocalStrategy(
      {
        usernameField: "emailAddress",
        passwordField: "password",
        session: true,
      },
      async function verify(
        usernameField: string,
        passwordField: string,
        cb: PassportCallBackFunction
      ) {
        try {
          const user = await userService.getUserbyEmailAddressAsync(
            usernameField
          );

          if (!user) {
            return cb(null, false, {
              message: "Email address or password is incorrect!",
            });
          }

          if (user.isLockedOut) {
            return cb(null, false, {
              message: "Account is locked out. Please reset your password.",
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
              message: "Email address or password is incorrect!",
            });
          }
        } catch (error) {
          return cb(error);
        }
      }
    )
  );

  /**
   * Configure Passport authenticated session persistence.
   * In order to restore authentication state across HTTP requests, Passport needs
   * to serialize users into and deserialize users out of the session.  The
   * typical implementation of this is as simple as supplying the user ID when
   * serializing, and querying the user record by ID from the database when
   * deserializing.
   * However, since this example does not have a database of user records, the
   * complete User object is serialized and deserialized.	When a database is used, the
   * User ID is serialized to the session, and the ID is then used to find
   * the User object during deserialization.
   */
  passportInstance.serializeUser(function (user: any, done) {
    process.nextTick(function () {
      return done(null, { emailAddress: user.emailAddress });
    });
  });

  /**
   * Deserialize user instance from the session data
   * @param user
   * @param done
   */
  passportInstance.deserializeUser(async function (user: any, done) {
    const userFound = await userService.getUserbyEmailAddressAsync(
      user.emailAddress
    );
    if (!userFound) {
      return done("User not found", userFound);
    }
    return done(null, userFound);
  });

  app.use(passportInstance.initialize());
  app.use(passportInstance.session());

  console.log("Passport has been configured");
  return passportInstance;
};
