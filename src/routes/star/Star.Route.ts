import { Request, Response, NextFunction, Router } from 'express';
import { Star } from '../../entity/Star/Star';
import { StarList } from '../../entity/Star/StarList';
import { INewStar } from '../../types/interface/star/INewStar.interface';
import { IUpdateStar } from '../../types/interface/star/IUpdateStar.interface';

class StarRouteClass {
	router: Router;

	constructor() {
		this.router = Router();
		this.initRoutes();
	}

	async addNewStar(req: Request, res: Response) {
		try {
			const { name, starListId }: INewStar = req.body;
			const star = new Star();

			star.name = name;
			star.starList = await StarList.findOne(starListId);

			star.save();

			res.json({
				success: 'Succesfully Created'
			});
		} catch (error) {
			res.json({
				error: 'Cannot Created Star'
			});
		}
	}

	async updateStar(req: Request, res: Response) {
		try {
			const updateStar: IUpdateStar = req.body;

			await Star.update(updateStar.id, { name: updateStar.name });

			res.status(201).json({
				success: 'Star Succesfully Updated'
			});
		} catch (error) {
			res.status(409).json({
				error: 'Star Cannot Updated'
			});
		}
	}

	async deleteStar(req: Request, res: Response) {
		try {
			const starId = req.body.id;
			await Star.delete(starId);
			res.status(202).json({
				success: 'Star Succesfully Deleted'
			});
		} catch (error) {
			res.status(409).json({
				success: 'Star Cannot Deleted'
			});
		}
	}

	private initRoutes() {
		this.router.post('/star/add', this.addNewStar.bind(this));
		this.router.delete('/star/delete', this.deleteStar.bind(this));
		this.router.put('/star/update', this.updateStar.bind(this));
	}
}

export const StarRoute = new StarRouteClass().router;
