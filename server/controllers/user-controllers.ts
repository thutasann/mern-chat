import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { LoginUserProps, UserProps } from '../types';
import { generateToken } from '../utils/token';
import { User } from '../models/user-model';

export const registerUser = asyncHandler(
	async (req: Request, res: Response) => {
		const { name, email, password, pic }: UserProps = req.body;

		if (!name || !email || !password) {
			res.status(400);
			throw new Error('Please Enter all the Fields');
		}

		const userExists = await User.findOne({ email });

		if (userExists) {
			res.status(400);
			throw new Error('User already exists');
		}

		const user = await User.create({
			name,
			email,
			password,
			pic,
		});

		if (user) {
			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				pic: user.pic,
				token: generateToken(user._id),
			});
		} else {
			res.status(400);
			throw new Error('Failed to create the User');
		}
	},
);

export const authUser = asyncHandler(async (req: Request, res: Response) => {
	const { email, password }: LoginUserProps = req.body;
	const user = await User.findOne({ email });

	// @ts-ignore
	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			pic: user.pic,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid Email or Password');
	}
});

// api/usre?search=
export const allUsers = asyncHandler(async (req: any, res: Response) => {
	const keyword = req.query.search
		? {
				$or: [
					{ name: { $regex: req.query.search, $options: 'i' } },
					{ email: { $regex: req.query.search, $options: 'i' } },
				],
		  }
		: {};
	const users = await User.find(keyword).find({
		_id: {
			$ne: req.user._id,
		},
	});
	res.send(users);
});
