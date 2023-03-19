import asyncHandler from 'express-async-handler';
import { Chat } from '../models/chat-model';
import { User } from '../models/user-model';
import { ChatProps, UserProps } from '../types';

/**
 * One to One chat
 * we are going to the userId which we are going to create a chat
 */
export const accessChat = asyncHandler(async (req: any, res: any) => {
	const { userId } = req.body;

	if (!userId) {
		console.log('UserId param not sent with request');
		return res.sendStatus(400);
	}

	var isChat: any[] = await Chat.find({
		isGroupChat: false,
		$and: [
			{ users: { $elemMatch: { $eq: req.user._id } } },
			{ users: { $elemMatch: { $eq: userId } } },
		],
	})
		.populate('users', '-password')
		.populate('latestMessage');

	isChat = await User.populate(isChat, {
		path: 'latestMessage.sender',
		select: 'name pic email',
	});

	if (isChat.length > 0) {
		res.send(isChat[0]);
	} else {
		var chatData = {
			chatName: 'sender',
			isGroupChat: false,
			users: [req.user._id, userId],
		};

		try {
			const createdChat = await Chat.create(chatData);
			const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
				'users',
				'-password',
			);
			res.status(200).json(FullChat);
		} catch (error: any) {
			res.status(400);
			throw new Error(error.message);
		}
	}
});

export const fetchChats = asyncHandler(async (req: any, res) => {
	try {
		Chat.find({
			users: {
				$elemMatch: {
					$eq: req.user._id,
				},
			},
		})
			.populate('users', '-password')
			.populate('groupAdmin', '-password')
			.populate('latestMessage')
			.sort({
				updatedAt: -1,
			})
			.then(async (results: any) => {
				results = await User.populate(results, {
					path: 'latestMessage.sender',
					select: 'name pic email',
				});
				res.status(200).send(results);
			});
	} catch (error) {
		res.status(400);
		console.error(error);
	}
});

export const createGroupChat = asyncHandler(async (req: any, res: any) => {
	if (!req.body.users || !req.body.name) {
		return res.status(400).send({
			message: 'Please Fill all the Fields',
		});
	}
	var users: UserProps[] = JSON.parse(req.body.users);

	if (users.length < 2) {
		return res
			.status(400)
			.send('More than 2 users are required to form a group chat');
	}

	users.push(req.user);

	try {
		const groupChat = await Chat.create({
			chatName: req.body.name,
			users: users,
			isGroupChat: true,
			groupAdmin: req.uesr,
		});
		const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
			.populate('users', '-password')
			.populate('groupAdmin', '-password');

		res.status(200).json(fullGroupChat);
	} catch (error: any) {
		res.status(400);
		throw new Error(error.message);
	}
});

export const renameGroupChat = asyncHandler(async (req, res) => {
	const { chatId, chatName } = req.body;

	const updatedChat = await Chat.findByIdAndUpdate<ChatProps>(
		chatId,
		{
			chatName,
		},
		{
			new: true,
		},
	)
		.populate('users', '-password')
		.populate('groupAdmin', '-password');

	if (!updatedChat) {
		res.status(404);
		throw new Error('Chat Not Found');
	} else {
		res.json(updatedChat);
	}
});

export const addToGroup = asyncHandler(async (req, res) => {
	const { chatId, userId } = req.body;

	const added = await Chat.findByIdAndUpdate(
		chatId,
		{
			$push: { users: userId },
		},
		{ new: true },
	)
		.populate('users', '-password')
		.populate('groupAdmin', '-password');

	if (!added) {
		res.status(404);
		throw new Error('Chat Not Found');
	} else {
		res.json(added);
	}
});

export const removeFromGroup = asyncHandler(async (req, res) => {
	const { chatId, userId } = req.body;

	const removed = await Chat.findByIdAndUpdate(
		chatId,
		{
			$pull: { users: userId },
		},
		{ new: true },
	)
		.populate('users', '-password')
		.populate('groupAdmin', '-password');

	if (!removed) {
		res.status(404);
		throw new Error('Chat Not Found');
	} else {
		res.json(removed);
	}
});
