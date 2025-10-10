import * as crypto from 'crypto';
import { Request, Response } from 'express';
import { IUserAccount, IUserService } from '../interfaces/userInterface';
import {
	insertUseraccountAsync,
	getUserbyEmailAddressAsync,
	updateLastLoggedInAsync,
} from '../models/userModel';
import { emailRegex, passwordRegex } from '../utils/regex';
import mongoose from 'mongoose';

export default class UserService implements IUserService {
	constructor() {}

	signup = async (emailAddress: string, password: string): Promise<boolean> => {
		const salt = crypto.randomBytes(64).toString('hex');
		const hashedPassword = await crypto.pbkdf2Sync(
			password,
			salt,
			100000,
			64,
			'sha512'
		).toString('hex');

		const document = await insertUseraccountAsync(
			emailAddress,
			hashedPassword,
			salt
		);

		if (!document) {
			return false;
		}
		return true;
	};

	signin = async (
		emailAddress: string,
		password: string,
		user:
			| (mongoose.Document<unknown, IUserAccount> &
					IUserAccount &
					Required<{
						_id: unknown;
					}>)
			| null
	): Promise<boolean> => {
		//const salt = crypto.randomBytes(64);
		const hashedPassword = await crypto.pbkdf2Sync(
			password,
			user?.salt || '',
			100000,
			64,
			'sha512'
		).toString('hex');		

		if (
			emailAddress == user?.emailAddress &&
			hashedPassword.toString() == user.password
		) {
			await updateLastLoggedInAsync(user);
			return true;
		} else {
			return false;
		}
	};

	// todo: make this a middleware for the signup route endpoint
	validateSignupFields = (_request: Request, _response: Response): boolean => {
		if (!_request.body.emailAddress && _request.body.emailAddress.match()) {
			_response.status(400).json({ errmsg: 'Please enter a username' });
			return true;
		}

		if (emailRegex.match(_request.body.emailAddress)) {
			_response.status(400).json({ errmsg: 'Please enter a valid username' });
			return true;
		}

		if (!_request.body.password) {
			_response.status(400).json({ errmsg: 'Please enter a password' });
			return true;
		}

		if (passwordRegex.match(_request.body.password)) {
			_response.status(400).json({ errmsg: 'Please enter a valid passwword' });
			return true;
		}

		if (!_request.body.confirmPassword) {
			_response.status(400).json({ errmsg: 'Please enter a confirm password' });
			return true;
		}
		if (_request.body.password !== _request.body.confirmPassword) {
			_response
				.status(400)
				.json({ errmsg: 'Password and confirm password do not match' });
			return true;
		}

		return false;
	};

	getUserbyEmailAddressAsync = async (
		emailAddress: string
	): Promise<
		| (mongoose.Document<unknown, IUserAccount> &
				IUserAccount &
				Required<{
					_id: unknown;
				}>)
		| null
	> => await getUserbyEmailAddressAsync(emailAddress);	
}
