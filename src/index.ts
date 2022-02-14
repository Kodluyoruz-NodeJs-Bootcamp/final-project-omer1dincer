import * as express from 'express';
import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import { createConnection } from 'typeorm';
import * as session from 'express-session';
import * as passport from 'passport';
import * as passportAuth from './auth/passportAuth/passportAuth';
import * as path from 'path';
import { isAuthenticated, isLoggedIn } from './middleware/authentication.middleware';
import { LoginRouter } from './routes/Login.Route';
import { RegisterRoute } from './routes/Register.Route';
import { Routers } from './routes/Routes.Route';
import { errorMiddleware } from './middleware/errorHandler.middleware';
dotenv.config();

class App {
	private app: express.Application;

	constructor() {
		this.app = express();
		this.config();
		this.initRoutes();
	}

	private config() {
		this.app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));

		passportAuth.passportAuthInitialize(passport);
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(passport.initialize());
		this.app.use(passport.session());

		this.app.use(express.static(path.join(__dirname, '../public')));
		this.app.set('view engine', 'ejs');
		this.app.set('views', path.join(__dirname, '../public/views'));
	}

	private initRoutes() {
		this.app.get('/', [isLoggedIn], (req: Request, res: Response) => {
			res.render('landing', { pageTitle: 'Welcome', message: '' });
		});

		this.app.use(LoginRouter);
		this.app.use(RegisterRoute);

		this.app.use([isAuthenticated], Routers);

		this.app.get('/logout' , (req:Request ,res:Response ,next : NextFunction)=>{
			req.logOut();
			res.status(301).redirect('/')
		})

		//Error Middleware
		this.app.use(errorMiddleware);
	}

	public StartApp() {
		createConnection().then(() => {
			console.log('Connected To DB');
			this.app.listen(process.env.PORT || 5000, () => {
				console.log('Online');
			});
		}).catch((error)=>{console.log("Error Happened" , error.message)});
	}
}

export default App;
