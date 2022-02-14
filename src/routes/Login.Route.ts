import { Request, Response, NextFunction, Router } from 'express';
import * as passport from 'passport';
import { passportAuthInitialize } from '../auth/passportAuth/passportAuth';
import { isLoggedIn } from '../middleware/authentication.middleware';

class LoginRouteClass {
	router: Router;

	constructor() {
		this.router = Router();
		passportAuthInitialize(passport);
		this.initRoutes();
	}

	/*Callback handle function for Facebook based Authentication*/
	async loginWithFacebook(req: Request, res: Response, next: NextFunction) {
		passport.authenticate('facebook', {
			failureRedirect: '/login',
			failureFlash: true,
			failureMessage: 'Cannot Login With Facebook'
		});

		res.status(301).redirect('/redirect/facebook');
	}

	/*Callback handle function for Google based Authentication*/
	async loginWithGoogle(req: Request, res: Response, next: NextFunction) {
		passport.authenticate('google', {
			successRedirect: '/redirect/google',
			failureRedirect: '/login',
			failureFlash: true,
			failureMessage: 'Cannot Login With Google'
		});
	}

	async redirect(req: Request, res: Response, next: NextFunction) {
		res.status(301).redirect('/home');
	}

	private initRoutes() {
		/*Local Authenticators*/
		this.router.get('/login', [isLoggedIn.bind(this)], (req: Request, res: Response) => {
			var message = req.session['valid'];
			res.render('login', { message: message || '', pageTitle: 'Login' });
		});

		this.router.post(
			'/login',
			passport.authenticate('local', {
				successRedirect: '/',
				failureRedirect: '/login',
				failureMessage: 'Cannot Login'
			})
		);
		/*Local Authenticators*/

		this.router.get('/auth/facebook', passport.authenticate('facebook'));
		this.router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
		this.router.get(
			'/google/callback',
			passport.authenticate('google', {
				successRedirect: '/redirect',
				failureRedirect: '/login',
				failureFlash: true,
				failureMessage: 'Cannot Login with Google'
			})
		);
		this.router.get(
			'/facebook/callback',
			passport.authenticate('facebook', {
				successRedirect: '/redirect',
				failureRedirect: '/login',
				failureFlash: true,
				failureMessage: 'Cannot Login with Facebook'
			})
		);

		this.router.get('/redirect', this.redirect.bind(this));
	}
}

export const LoginRouter = new LoginRouteClass().router;
