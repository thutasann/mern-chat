import { Request } from 'express';
import asyncHandler from 'express-async-handler';
import { Schema } from 'mongoose';
import { Chat } from '../models/chat-model';
/**
 * One to One chat
 * we are going to the userId which we are going to create a chat
 */
// @ts-ignore
const accessChat = asyncHandler(async (req: any, res) => {
	const { userId } = req.body;

	if (!userId) {
		console.log('Userid param not sent with request');
		return res.sendStatus(400);
	}
	var isChat = await Chat.find({
		isGroupChat: false,
		$and: [
			{
				users: {
					$eleMatch: {
						$eq: req.user._id,
					},
				},
			},
			{
				users: {
					$eleMatch: {
						$eq: userId,
					},
				},
			},
		],
	})
		.populate('users', '-password')
		.populate('latestMessage');
});
