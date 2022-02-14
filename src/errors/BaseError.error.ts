export default class BaseError extends Error {
	statusCode: number;
	type: string;
	info: string;

	constructor(message: string, statusCode: number, type: string, info: string) {
		super(message);
		this.statusCode = statusCode;
		this.type = type;
		this.info = info;
	}
}
