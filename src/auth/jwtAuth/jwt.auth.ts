import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();


export const jwtSign = (userId: any) => {
	const payload = {
		userId: userId
	};
	const jwtExpire = '7d';
	const jwtSecret = process.env.JWT_SECRET;

	const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire });
	return token;
};

export const jwtVerify = (token: any): any => {
	try {
		const jwtSecret = process.env.JWT_SECRET;
		jwt.verify(token, jwtSecret);
		return true;
	} catch {
		return false;
	}
};
export const jwtDecode = (token: any): any => {
	const jwtSecret = process.env.JWT_SECRET;
	return jwt.verify(token, jwtSecret);
};
