/* import { Response } from "express";

export class HelperUtilities {
	constructor() {}

	handleResponse = (
		isSuccessful: boolean,
		response: Response
	): Response<any, Record<string, any>> => {
		return isSuccessful ? response.sendStatus(200) : response.sendStatus(500);
	};

	handleResponseDynamically = (
		isSuccessful: boolean,
		successfulResponseCode: number,
		errorResponsecode: number,
		response: Response
	): Response<any, Record<string, any>> => {
		return isSuccessful
			? response.sendStatus(successfulResponseCode ?? 200)
			: response.sendStatus(errorResponsecode ?? 500);
	};
}
 */
