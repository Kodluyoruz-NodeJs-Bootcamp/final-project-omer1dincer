import BaseError from './baseError.error';

export default class ServerError extends BaseError {
	statusCode: number;
	type: string;
	info: string;

	constructor(message: string, statusCode: number, type: string, info: string) {
		super(message, statusCode, type, info);
	}
}
