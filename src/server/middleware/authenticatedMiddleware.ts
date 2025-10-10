import { Request, Response, NextFunction } from "express";

/**
 * Middleware to ensure the user is authenticated
 * Returns 401 Unauthorized if not authenticated
 * Usage: app.use('/protected-route', authenticatedMiddleware, protectedRouteHandler);
 * @param _request Express Request object
 * @param _response Express Response object
 * @param _next Express NextFunction to pass control to the next middleware
 * @returns Calls next() if authenticated, otherwise sends 401 response
 * @example
 * app.get('/api/protected', authenticatedMiddleware, (req, res) => {
 * res.json({ message: 'This is a protected route' });
 * });
 */
export const authenticatedMiddleware = (
  _request: Request,
  _response: Response,
  _next: NextFunction
) => {
  if (_request.isAuthenticated()) {
    return _next();
  }
  _response.sendStatus(401);
}