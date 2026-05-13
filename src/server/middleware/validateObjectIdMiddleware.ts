import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from '../utils/idValidator';

/**
 * Middleware to validate MongoDB ObjectId parameters in the request
 * Validates specified param names and returns 400 if any are invalid
 * @param paramNames - Array of param names to validate (e.g., ['id', 'listId'])
 * @returns Express middleware function
 */
export const validateObjectIdParams = (paramNames: string[]) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const invalidParams = paramNames.filter((param) => {
    const value = req.params[param];
    return value && typeof value === 'string' && !isValidObjectId(value);
  });

  if (invalidParams.length > 0) {
    return res.status(400).json({
      error: 'Invalid ID format',
      invalidParams,
    });
  }

  next();
};

/**
 * Middleware to validate ObjectId in request body
 * @param fieldNames - Array of field names to validate (e.g., ['userId', 'listId'])
 * @returns Express middleware function
 */
export const validateObjectIdBody = (fieldNames: string[]) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const invalidFields = fieldNames.filter(
    (field) => req.body[field] && !isValidObjectId(req.body[field]),
  );

  if (invalidFields.length > 0) {
    return res.status(400).json({
      error: 'Invalid ID format in request body',
      invalidFields,
    });
  }

  next();
};
