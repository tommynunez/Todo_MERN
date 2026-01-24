import { NextFunction, Request, Response, Router } from "express";
import UserService from "../services/userService";
import ChorelistService from "../services/choreListService";
import passport from "passport";
import { authenticatedMiddleware } from "../middleware/authenticatedMiddleware";

export const createAuthenticationroutes = (
  _userService: UserService,
  _chorelistService: ChorelistService,
): Router => {
  const router: Router = Router();
  /**
   * Sign up a new user
   * Body params:
   * emailAddress: string - email address of the user
   * password: string - password for the user
   * confirmPassword: string - confirmation of the password
   * Returns: 201 on success or 500 on error
   * Example: POST /api/auth/signup
   * Body: { emailAddress: "testemail", password: "P@ssw0rd!", confirmPassword: "P@ssw0rd!" }
   * Response: { response: true, status: 201 }
   */
  router.post("/signup", async (_request: Request, _response: Response) => {
    try {
      const hasErrors = _userService.validateSignupFields(_request, _response);

      if (hasErrors) {
        return;
      }

      const userWasregistered = await _userService.signup(
        _request.body.emailAddress,
        _request.body.password,
      );

      if (userWasregistered) {
        const user = await _userService.getUserbyEmailAddressAsync(
          _request.body.emailAddress,
        );

        if (user && user._id) {
          await _chorelistService.insertChorelistAsync({
            title: "My Chore List",
            owner: user.id,
          });

          // sign in the user and establish a session
          _request.logIn(user, (err: any) => {
            if (err) {
              console.error("Auto-login after signup failed:", err);
              return _response.status(500).json({ errmsg: "Login failed" });
            }

            return _response.sendStatus(201);
          });
        } else {
          return _response.status(500).json({ errmsg: "User not found" });
        }
      } else {
        throw new Error("User was not created");
      }
    } catch (error) {
      console.log(error);
      _response.status(500).json({ errmsg: error?.toString() });
    }
  });

  /**
   * Sign in an existing user
   * Body params:
   * emailAddress: string - email address of the user
   * password: string - password for the user
   * Returns: 200 on success or 401 on failure
   * Example: POST /api/auth/signin
   * Body: { emailAddress: "testemail", password: "P@ssw0rd!" }
   * Response: { response: true, status: 200 }
   * Example: POST /api/auth/signin
   * Body: { emailAddress: "testemail", password: "wrongpassword" }
   * Response: { response: false, status: 401 }
   * Note: Uses passport local strategy for authentication
   * Session is enabled to maintain user state across requests
   * On successful authentication, user info is stored in session
   * On failure, responds with 401 Unauthorized
   */
  router.post(
    "/signin",
    (_request: Request, _response: Response, _next: NextFunction) => {
      try {
        passport.authenticate(
          "local",
          { session: true },
          (err: any, user?: Express.User | false | null, message?: any) => {
            if (err) {
              return _next(err);
            }
            if (!user) {
              return _response.status(401).json({ errmsg: message?.message });
            } else if (
              message &&
              message.message ==
                "Account is locked out. Please reset your password."
            ) {
              return _response.status(423).json({ errmsg: message?.message });
            } else {
              _request.logIn(user, (err) => {
                if (err) {
                  return _next(err);
                }
                return _response.sendStatus(200);
              });
            }
          },
        )(_request, _response, _next);
      } catch (error) {
        console.error("Error during signin:", error);
        return _response.status(500).json({ errmsg: "Internal server error" });
      }
    },
  );

  /**
   * Log out the current user
   * Returns: 200 on success
   * Example: POST /api/auth/logout
   * Response: { response: true, status: 200 }
   * Note: Uses passport's logout method to terminate the user session
   * On success, responds with 200 OK
   * On failure, passes the error to the next middleware
   * Session is destroyed and user info is removed from session
   * Ensures user is fully logged out
   * Session cookie is invalidated on client side
   * Helps prevent unauthorized access after logout
   */
  router.post(
    "/logout",
    authenticatedMiddleware,
    (_request: Request, _response: Response, next: NextFunction) => {
      try {
        _request.logout(function (error: any) {
          if (error) {
            return next(error);
          }
          _request.session.destroy(() => {
            _response.clearCookie("connect.sid", { path: "/" });
            _response.sendStatus(200);
          });
        });
      } catch (error) {
        console.error("Error during logout:", error);
        next(error);
      }
    },
  );

  router.post(
    "/confirm/email",
    async (_request: Request, _response: Response, next: NextFunction) => {
      try {
        if (_request.body.token == null) {
          const errmsg = "Missing token";
          _response.status(400).json({ errmsg });
          return next(errmsg);
        }

        const isEmailConfirmed = await _userService.confirmEmailAsync(
          _request.body.token,
        );
        if (isEmailConfirmed) {
          _response.status(200).json({ response: true });
        } else {
          _response.status(422).json({ response: false });
        }
      } catch (error) {
        console.error("Error during email confirmation:", error);
        return _response.status(500).json({ errmsg: "Internal server error" });
      }
    },
  );

  router.post(
    "/forgotpassword",
    async (_request: Request, _response: Response) => {
      try {
        if (_request.body.emailAddress == null) {
          const errmsg = "Missing email address";
          return _response.status(400).json({ errmsg });
        }
        const user = await _userService.getUserbyEmailAddressAsync(
          _request.body.emailAddress,
        );
        if (user == null || _request.body.emailAddress != user.emailAddress) {
          return _response.status(200).json({
            errmsg:
              "If an account with that email exists, you will receive an email with instructions.",
          });
        }

        await _userService.sendForgotpasswordEmailAsync(
          _request.body.emailAddress,
        );

        return _response.status(200).json({ response: true });
      } catch (error) {
        console.error(error);
        return _response.status(500).json({ errmsg: "Internal server error" });
      }
    },
  );

  router.put(
    "/forgotpassword",
    async (_request: Request, _response: Response) => {
      try {
        const query = _request.query;
        if (query.token == null) {
          return _response.status(400).json({ errmsg: "Missing token" });
        }

        if (_request.body.password != _request.body.confirmPassword) {
          return _response
            .status(422)
            .json({ errmsg: "Passwords do not match" });
        }

        const [isPasswordReset, user] = await _userService.resetPasswordAsync(
          query.token.toString(),
          _request.body.password,
        );

        if (isPasswordReset) {
          _request.logIn(user, (err: any) => {
            if (err) {
              console.error("Auto-login after password reset failed:", err);
              return _response.status(500).json({ errmsg: "Login failed" });
            }
            return _response.status(200).json({ response: true });
          });
        } else {
          return _response.status(400).json({ response: false });
        }
      } catch (error) {
        console.error(error);
        return _response.status(500).json({ errmsg: "Internal server error" });
      }
    },
  );

  router.get(
    "/checkauth",
    authenticatedMiddleware,
    async (_request: Request, _response: Response) => {
      console.log("User is authenticated", _request.user);
      if (_request.user) {
        return _response.status(200).json({ response: true });
      } else {
        return _response.status(401).json({ response: false });
      }
    },
  );

  return router;
};
