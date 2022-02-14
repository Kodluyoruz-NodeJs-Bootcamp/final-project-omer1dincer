import { Request, Response, NextFunction } from 'express';
import { jwtVerify } from '../auth/jwtAuth/jwt.auth';
import ServerError from '../errors/serverError.error';


/*
    This function works as an authetication middleware that controls req.user property.
    If JwtVerify returns true , user is already authenticated , has a valid token.

*/ 
export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (jwtVerify(req.user)) {
			next();
		} else {
			res.status(401).render('register', { pageTitle: 'Register', message: '', error: { message: 'Please Login' } });
		}
	} catch (e) {
		next(new ServerError('Internal Server Error', 500, 'Server Error', 'Something Happened at Server Side'));
	}
};

/*
    This function is controls if user is logged in.
    If JwtVerify returns true , means user is logged in successfully, can access protected routes.
    If JwtVerify returns false , means user needs login to access protected routes
*/

export const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!(jwtVerify(req.user))) {
			next();
		} else {
			res.status(301).redirect('/home');
		}
	} catch (e) {
		next(new ServerError('Internal Server Error', 500, 'Server Error', 'Internal Server Error Happened'));
	}
};
