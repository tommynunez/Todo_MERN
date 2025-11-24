import { NextFunction, Request, Response, Router } from "express";
import UserService from "../services/userService";
import passport from "passport";
import { authenticatedMiddleware } from "../middleware/authenticatedMiddleware";
import { sendEmail } from "../infrastructure/email/maileroo.wraper";

export const createAuthenticationroutes = (
  _userService: UserService
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
        _request.body.password
      );

      if (userWasregistered) {
        _response.sendStatus(201);
        await sendEmail("CONFIRM_EMAIL", _request.body.emailAddress, {
          userName: _request.body.emailAddress,
          confirmationLink: "https://yourapp.com/invite/abc123",
        });
        return;
      } else {
        throw "User was not created";
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
      passport.authenticate(
        "local",
        { session: true },
        (err: any, user?: Express.User | false | null) => {
          if (err) {
            return _next(err);
          }
          if (!user) {
            return _response.sendStatus(401);
          } else {
            _request.logIn(user, (err) => {
              if (err) {
                return _next(err);
              }
              return _response.sendStatus(200);
            });
          }
        }
      )(_request, _response, _next);
    }
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
      _request.logout(function (error: any) {
        if (error) {
          return next(error);
        }
        _request.session.destroy(() => {
          _response.clearCookie("connect.sid", { path: "/" });
          _response.sendStatus(200);
        });
      });
    }
  );

  router.post(
    "/confirm/email",
    (_request: Request, _response: Response, next: NextFunction) => {
      if (_request.body.emailAddress == null || _request.body.token == null) {
        const errmsg = "Missing emailAddress or token";
        _response.status(400).json({ errmsg });
        return next(errmsg);
      }

      _userService.confirmEmailAsync(
        _request.body.emailAddress,
        _request.body.token
      );
    }
  );

  return router;
};
