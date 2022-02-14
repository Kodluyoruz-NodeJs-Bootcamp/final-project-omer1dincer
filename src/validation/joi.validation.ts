import { NextFunction, Response, Request } from 'express';
import * as Joi from 'joi';

export async function registerValidation(req: Request, res: Response, next: NextFunction) {
	const registerSchema = Joi.object({
		name: Joi.string().required().min(3).max(20).required(),
		username : Joi.string().required().min(3).max(20).required(),
		email: Joi.string().email().required(),
		password: Joi.string().alphanum().min(4)
	}).options({ abortEarly: false });

	const _request = req.body;

	try {
		registerSchema.validateAsync(_request);
		next();
	} catch (e) {
		res
			.status(301)
			.render('register', { pageTitle: 'Register', message: 'Cannot Register.Check Your Credentials and Try Again' });
	}
}
