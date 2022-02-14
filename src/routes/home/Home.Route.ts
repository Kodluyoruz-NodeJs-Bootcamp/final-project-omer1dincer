import { Request, Response, NextFunction, Router } from 'express';
import { jwtDecode, jwtVerify } from '../../auth/jwtAuth/jwt.auth';
import { User } from '../../entity/User';
import ServerError from '../../errors/serverError.error';
import { UsersDto } from '../../types/dto/Users.dto';
import { IUserNavbar } from '../../types/interface/IUserNavbar.interface';

class HomeRouteClass {
	router: Router;

	constructor() {
		this.router = Router();
		this.initRoutes();
	}

	async index(req: Request, res: Response, next: NextFunction) {
		try {
			const user: User = await User.findOne(jwtDecode(req.user).userId);
			const userNavbar: IUserNavbar = await user.currentUserDTO();
			const users: UsersDto = await User.find({
				select: ['id', 'username', 'name'],
				relations: ['movieList', 'starList', 'movieList.comments', 'starList.comments']
			});

			res.render('home', { pageTitle: 'Home', userNavbar: userNavbar, users: users });
		} catch (err) {
			next(new ServerError('Internal Server Error', 500, 'Server Error', 'Internal Server Error Happened'));
		}
	}

	private initRoutes() {
		this.router.get('/home', this.index.bind(this));
	}
}

export const HomeRoute = new HomeRouteClass().router;
