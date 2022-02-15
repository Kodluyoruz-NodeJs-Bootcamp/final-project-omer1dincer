import { NextFunction, Request } from 'express';
import * as dotenv from 'dotenv';
import * as passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as LocalStrategy } from 'passport-local';
import { MovieList } from '../../entity/Movie/MovieList';
import { StarList } from '../../entity/Star/StarList';

import { User } from '../../entity/User';
import { jwtSign } from '../jwtAuth/jwt.auth';
import AuthenticationError from '../../errors/AuthenticationError.error';

dotenv.config();

export const passportAuthInitialize = (passport) => {
	passport.use(
		new FacebookStrategy(
			{
				clientID: '277235604500759',
				clientSecret: 'ac8db9606cba1229e3c3ee6ed7222ba6',
				callbackURL: 'http://localhost:' + process.env.PORT || 5000 + '/facebook/callback'
			},
			async function (accessToken: string, refreshToken: string, profile: passport.Profile, done: any): Promise<void> {
				/*First , check if Facebook Profile is registered app*/
				//If not , create new user with Facebook Credentials
				try {
					const user = await User.findOne({ facebook_id: profile.id });

					if (!user) {
						let newUser = new User();
						newUser.name = profile.displayName;
						newUser.facebook_id = profile.id;
						newUser.provider = profile.provider;
						const token = await initializeUser(newUser);
						return done(null, token);
					} else {
						let user = await User.findOne({ facebook_id: profile.id });
						const token = jwtSign(user.id);
						return done(null, token);
					}
				} catch (error) {
					done(new AuthenticationError("Cannot Login with Facebook", 401 , "Authorization" , "Cannot Login with Facebook"));
				}
			}
		)
	);

	passport.use(
		new GoogleStrategy(
			{
				clientID: '804366156039-lqjb3c269tjmkcc7msmsbkruu9i4lk0q.apps.googleusercontent.com',
				clientSecret: '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',
				// callbackURL: 'http://localhost:' + process.env.PORT || 5000 + '/google/callback',
				callbackURL: 'https://omerdincer-moviepool.herokuapp.com/google/callback',
				passReqToCallback: true
			},
			async function (
				request: Request,
				accessToken: string,
				refreshToken: string,
				profile: passport.Profile,
				done: any
			): Promise<void> {
				/*First , check if Facebook Profile is registered app*/
				//If not , create new user with Google Credentials
				try {
					const user = await User.findOne({ google_id: profile.id });
					if (!user) {
						let newUser = new User();
						newUser.name = profile.displayName;
						newUser.google_id = profile.id;
						newUser.provider = profile.provider;
						const token = await initializeUser(newUser);
						return done(null, token);
					} else {
						let user = await User.findOne({ google_id: profile.id });
						const token = jwtSign(user.id);
						return done(null, token);
					}
				} catch (error) {
					done(new AuthenticationError("Cannot Login with Google", 401 , "Authorization" , "Cannot Login with Google"));
				}
			}
		)
	);

	passport.use(
		new LocalStrategy(
			{
				usernameField: 'username',
				passwordField: 'password',
				passReqToCallback: true
			},
			async function (req: Request, username: string, password: string, done: any): Promise<void> {
				try {
					const user = await User.findOne({ username: username });
					if (!user) {
						return done(null, false, { message: 'Wrong Username' });
					} else if (!(await user.isPasswordValid(password))) {
						return done(null, false, { message: 'Wrong Password' });
					} else {
						const token = jwtSign(user.id);
						done(null, token);
					}
				} catch (error) {
					done(new AuthenticationError("Cannot Login", 401 , "Authorization" , "Cannot Login"));
				}
			}
		)
	);

	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	passport.deserializeUser(function (user, done) {
		done(null, user);
	});

	///Helper
	async function initializeUser(user: User) {
		await user.save();
		const movieList: MovieList = new MovieList();
		const starList: StarList = new StarList();
		(movieList.owner = user), (starList.owner = user);
		await movieList.save(), await starList.save();
		const token: string = jwtSign(user.id);
		return token;
	}
};
