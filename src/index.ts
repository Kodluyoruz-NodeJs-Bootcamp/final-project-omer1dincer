import { relative } from 'path';
import { createConnection } from 'typeorm';
import { Movie } from './entity/Movie';
import { User } from './entity/User';

createConnection()
	.then(async (connection) => {
		// console.log("Inserting a new user into the database...");
		// const user = new User();
		// user.firstName = "Timber";
		// user.lastName = "Saw";
		// user.age = 25;
		// await connection.manager.save(user);
		// console.log("Saved a new user with id: " + user.id);

		// console.log("Loading users from the database...");
		// const users = await connection.manager.find(User);
		// console.log("Loaded users: ", users);

		// const user = new User();
		// user.firstName = "Azat";

		// await connection.manager.save(user);
		// const movie = new Movie();

		let user = new User();

		user.firstName = 'TestName';
		user.firstName = '123123';

		const param = await user.save();

		console.log(param.id);

		// movie.movieName = "Recep İvedik";
		// movie.user_id = azat;

		// await connection.manager.save(movie);

		// const movie2 = new Movie();

		// movie2.movieName = "Recep İvedik";
		// movie2.user_id = azat;

		// await connection.manager.save(movie2);

		// console.log("Here you can setup and run express/koa/any other framework.");
	})
	.catch((error) => console.log(error));
