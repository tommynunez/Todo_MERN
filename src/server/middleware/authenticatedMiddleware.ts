import { Request, Response, NextFunction } from "express";

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