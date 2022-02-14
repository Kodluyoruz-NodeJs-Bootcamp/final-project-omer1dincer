import { Request, Response, NextFunction, Router } from 'express';
import { jwtDecode } from '../../auth/jwtAuth/jwt.auth';
import { MovieList } from '../../entity/Movie/MovieList';
import { StarList } from '../../entity/Star/StarList';
import { User } from '../../entity/User';
import ServerError from '../../errors/serverError.error';
import { IUserNavbar } from '../../types/interface/IUserNavbar.interface';

class UserRouteClass {
	router: Router;
	constructor() {
		this.router = Router();
		this.initRoutes();
	}

	async userIndex(req: Request, res: Response, next: NextFunction) {
		try {
			const userNav = await User.findOne(jwtDecode(req.user).userId);
			const userNavbar: IUserNavbar = await userNav.currentUserDTO();

			const user_id: string = String(req.params.id);

			const user = await User.findOne(user_id, { relations: ['movieList', 'starList', 'movieList.movies', 'starList.stars'] });

			res.status(200).render('user', { pageTitle: user.name + "'s Profile", userNavbar: userNavbar, user: user });
		} catch (err) {
			next(new ServerError('Internal Server Error', 500, 'Server Error', 'Internal Server Error Happened'));
		}
	}

	async userProfile(req: Request, res: Response, next: NextFunction) {
		try {
			const userNav = await User.findOne(jwtDecode(req.user).userId, {
				relations: ['movieList', 'starList', 'movieList.movies', 'starList.stars']
			});
			const userNavbar: IUserNavbar = await userNav.currentUserDTO();

			res.status(200).render('profile', { pageTitle: 'Profile', userNavbar: userNavbar, user: userNav });
		} catch (err) {
			next(new ServerError('Internal Server Error', 500, 'Server Error', 'Internal Server Error Happened'));
		}
	}

	async userMovies(req: Request, res: Response, next: NextFunction) {
		try {
			const userNav = await User.findOne(jwtDecode(req.user).userId);
			const userNavbar: IUserNavbar = await userNav.currentUserDTO();

			const movieListId: number = Number(req.params.id);

			const movieList = await MovieList.findOne(movieListId, { relations: ['movies', 'owner', 'comments'] });

			res.status(200).render('listMovie', {
				pageTitle: movieList.owner.name || movieList.owner.username + "'s Movie List",
				movieList: movieList,
				userNavbar: userNavbar
			});
		} catch (err) {
			next(new ServerError('Internal Server Error', 500, 'Server Error', 'Internal Server Error Happened'));
		}
	}
	async userStars(req: Request, res: Response, next: NextFunction) {
		try {
			const userNav = await User.findOne(jwtDecode(req.user).userId);
			const userNavbar: IUserNavbar = await userNav.currentUserDTO();

			const starListId: number = Number(req.params.id);

			const starList = await StarList.findOne(starListId, { relations: ['stars', 'owner', 'comments'] });

			res.status(200).render('listStar', {
				pageTitle: starList.owner.name || starList.owner.username + "'s Star List",
				starList: starList,
				userNavbar: userNavbar
			});
		} catch (err) {
			next(new ServerError('Internal Server Error', 500, 'Server Error', 'Internal Server Error Happened'));
		}
	}

	private initRoutes() {
		this.router.get('/profile', this.userProfile.bind(this));
		this.router.get('/:id', this.userIndex.bind(this));
		this.router.get('/list/movie/:id', this.userMovies.bind(this));
		this.router.get('/list/star/:id', this.userStars.bind(this));
	}
}
export const UserRoute = new UserRouteClass().router;
