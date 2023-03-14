import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';

/**
 * NotFound Middleware
 * @param req
 * @param res
 * @param next
 */
export const NotFound = (req: Request, res: Response, next: NextFunction) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

/**
 * Error Handler
 * @param error
 * @param res
 */
export const ErrorHandler = (error: Error, res: any) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message: error.message,
		stack: process.env.NODE_ENV === 'production' ? null : error.stack,
	});
};
