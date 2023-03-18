import asyncHandler from 'express-async-handler';
import { Chat } from '../models/chat-model';
import { User } from '../models/user-schema';

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
