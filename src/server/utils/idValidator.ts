import { Types } from 'mongoose';

/**
 * Converts and validates a string to a MongoDB ObjectId
 * @param id - The string ID to convert
 * @returns A valid MongoDB ObjectId
 * @throws Error if the ID is not a valid ObjectId string
 */
export const toObjectId = (id: string): Types.ObjectId => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error(`Invalid ObjectId: ${id}`);
  }
  return new Types.ObjectId(id);
};

/**
 * Checks if a string is a valid ObjectId without throwing
 * @param id - The string ID to check
 * @returns true if valid, false otherwise
 */
export const isValidObjectId = (id: string): boolean =>
  Types.ObjectId.isValid(id);
