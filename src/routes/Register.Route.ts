import { Request, Response, NextFunction, Router } from 'express';
import { IRegister } from '../types/interface/IRegister.interface';

import { User } from '../entity/User';
import { Like } from 'typeorm';
import { MovieList } from '../entity/Movie/MovieList';
import { StarList } from '../entity/Star/StarList';
import { jwtSign } from '../auth/jwtAuth/jwt.auth';

class RegisterRouteClass {
	router: Router;

	constructor() {
		this.router = Router();
		this.initRoutes();
	}

	private async register(req: Request, res: Response, next: NextFunction) {
		try {
			const { name, username, email, password }: IRegister = req.body;
			const user = await User.findOne({
				where: [{ username: Like(username) }, { email: Like(email) }]
			});
			if (user) {
				res.status(409).render('register', { pageTitle: 'Register', error: { message: 'User Already Exists' } });
			} else {
				const newUser = new User();
				(newUser.name = name), (newUser.username = username), (newUser.email = email);
				(newUser.password = password), newUser.hashPassword(), (newUser.provider = 'Local');
				await this.initializeUser(newUser);
				req.session['valid'] = 'You can login with your credentials !';
				res.status(201).redirect('login');
			}
		} catch (e) {
			next(e);
		}
	}

	//Helpers
	async initializeUser(user: User) {
		await user.save();
		const movieList: MovieList = new MovieList();
		const starList: StarList = new StarList();
		(movieList.owner = user), (starList.owner = user);
		await movieList.save(), await starList.save();
		const token: string = jwtSign(user.id);
	}

	private initRoutes() {
		this.router.get('/register', (req: Request, res: Response, next: NextFunction) => {
			res.render('register', { pageTitle: 'Register', message: '', error: {} });
		});
		this.router.post('/register', this.register.bind(this));
	}
}

export const RegisterRoute = new RegisterRouteClass().router;
