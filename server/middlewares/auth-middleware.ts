import jwt from 'jsonwebtoken';
import asyncHander from 'express-async-handler';
import { NextFunction, Response } from 'express';
import { User } from '../models/user-model';

export const protect = asyncHander(
	async (req: any, res: Response, next: NextFunction) => {
		let token;
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			try {
				token = req.headers.authorization.split(' ')[1];
				const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
				req.user = await User.findById(decoded.id).select('-password');
				next();
			} catch (error) {
				res.status(401);
				throw new Error('Not Authorized, token Failed!');
			}
		}

		if (!token) {
			res.status(401);
			throw new Error('Not Authorized, no Token!');
		}
	},
);
