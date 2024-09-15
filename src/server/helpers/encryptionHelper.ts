import * as crypto from 'crypto';
import { NextFunction } from 'express';

export const encryptPassword = async (
	texTobeEncrypted: string,
	next: NextFunction,
	delegate: (
		err: Error | null,
		next: NextFunction,
		derivedKey: Buffer,
		salt?: Buffer | string
	) => void,
	storedSalt?: Buffer | string
) => {
	const salt = storedSalt ? storedSalt : crypto.randomBytes(16);
	crypto.pbkdf2(
		texTobeEncrypted,
		salt,
		310000,
		32,
		'sha256',
		async (error: any, hashedPassword: Buffer) => {
			delegate(error, next, hashedPassword, salt);
		}
	);
};
