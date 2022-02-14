import { isAuthenticated } from '../middleware/authentication.middleware';
import { HomeRoute } from '../routes/home/Home.Route';
import { UserRoute } from '../routes/user/User.Route';
import { MovieRoute } from '../routes/movie/Movie.Route';
import { StarRoute } from '../routes/star/Star.Route';
import { CommentLikeRoute } from '../routes/comment/Comment.Route';
import { Router } from 'express';

class RouterClass {
	routers: Router;
	constructor() {
		this.routers = Router();
		this.initializeRoutes();
	}

	private initializeRoutes() {
		//Protected Routes
		this.routers.use(HomeRoute);
		this.routers.use('/user', UserRoute);
		this.routers.use('/movie', MovieRoute);
		this.routers.use('/star', StarRoute);
		this.routers.use(CommentLikeRoute);
	}
}

export const Routers = new RouterClass().routers
