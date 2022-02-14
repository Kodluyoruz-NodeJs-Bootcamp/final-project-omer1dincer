import { Request, Response, Router } from 'express';
import { MovieList } from '../../entity/Movie/MovieList';
import { MovieListComment } from '../../entity/Movie/MovieListComment';
import { StarList } from '../../entity/Star/StarList';
import { StarListComment } from '../../entity/Star/StarListComment';
import { IComment } from '../../types/interface/comment/IComment.interface';

class CommentLikeRouteClass {
	router: Router;

	constructor() {
		this.router = Router();
		this.initRoutes();
	}

	async addStarComment(req: Request, res: Response) {
		try {
			const newComment: IComment = req.body;

			const comment: StarListComment = new StarListComment();
			const list = await StarList.findOne(newComment.list_id);
			comment.comment = newComment.comment;
			comment.starList = list;

			comment.save();

			res.status(201).json({
				success: 'Comment Added'
			});
		} catch (error) {
			res.status(409).json({
				error: 'Comment Cannot Added.'
			});
		}
	}
	async likeStar(req: Request, res: Response) {
		try {
			const list_id = req.body;
			const list: StarList = await StarList.findOne(list_id);
			list.likes += 1;
			list.save();
		} catch (error) {}
	}

	async addMovieComment(req: Request, res: Response) {
		try {
			const newComment: IComment = req.body;

			const comment: MovieListComment = new MovieListComment();
			const list = await MovieList.findOne(newComment.list_id);
			comment.comment = newComment.comment;
			comment.movieList = list;

			comment.save();

			res.status(201).json({
				success: 'Comment Added'
			});
		} catch (error) {
			res.status(409).json({
				error: 'Comment Cannot Added.'
			});
		}
	}
	async likeMovie(req: Request, res: Response) {
		try {
			const list_id = req.body;
			const list: MovieList = await MovieList.findOne(list_id);
			list.likes += 1;
			list.save();
		} catch (error) {}
	}

	initRoutes() {
		this.router.post('/comment/star/add', this.addStarComment.bind(this));
		this.router.post('/like/star', this.likeStar.bind(this));

		this.router.post('/comment/movie/add', this.addMovieComment.bind(this));
		this.router.post('/like/movie', this.likeMovie.bind(this));
	}
}

export const CommentLikeRoute = new CommentLikeRouteClass().router;
