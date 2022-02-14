import { Response, Request, NextFunction, Router } from 'express';
import { Movie } from '../../entity/Movie/Movie';
import { MovieList } from '../../entity/Movie/MovieList';
import { INewMovie } from '../../types/interface/movie/INewMovie.interface';
import { IUpdateMovie } from '../../types/interface/movie/IUpdateMovie.interface';

class MovieRouteClass {
	router: Router;

	constructor() {
		this.router = Router();
		this.initRoutes();
	}

	async addNewMovie(req: Request, res: Response) {
		try {
			const { movieListId, name }: INewMovie = req.body;
			const newMovie = new Movie();

			newMovie.name = name;
			newMovie.movieList = await MovieList.findOne(movieListId);

			newMovie.save();

			res.status(201).json({
				success: 'Succesfully Created'
			});
		} catch (error) {
			res.status(409).json({
				error: 'Cannot Created Movie'
			});
		}
	}
	async updateMovie(req: Request, res: Response) {
		try {
			const updateMovie: IUpdateMovie = req.body;
			await Movie.update(updateMovie.id, { name: updateMovie.name });

			res.status(201).json({
				success: 'Succesfully Updated'
			});
		} catch (error) {
			res.status(409).json({
				error: 'Cannot Updated Movie'
			});
		}
	}
	async deleteMovie(req: Request, res: Response) {
		try {
			const movieId = req.body.id;
			await Movie.delete(movieId);
			res.status(202).json({
				success: 'Movie Succesfully Deleted'
			});
		} catch (error) {
			res.status(409).json({
				error: "Movie Cannot Deleted"
			});
		}
	}

	initRoutes() {
		this.router.post('/add', this.addNewMovie.bind(this));
		this.router.delete('/delete', this.deleteMovie.bind(this));
		this.router.put('/update' , this.updateMovie.bind(this))
	}
}

export const MovieRoute = new MovieRouteClass().router;
