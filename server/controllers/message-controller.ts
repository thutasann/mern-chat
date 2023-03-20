import asyncHandler from 'express-async-handler';
import { SendMessagePayloadProps } from '../types';
import { Message } from '../models/message-model';
import { User } from '../models/user-model';
import { Chat } from '../models/chat-model';

/**
 * Send Message
 */
export const sendMessage = asyncHandler(async (req: any, res: any) => {
	const { content, chatId }: SendMessagePayloadProps = req.body;

	if (!content || !chatId) {
		console.log('Invalid data passed into request');
		return res.sendStatus(400);
	}

	var newMessage = {
		sender: req.user._id,
		content: content,
		chat: chatId,
	};

	try {
		var message = await Message.create(newMessage);
		message = await message.populate('sender', 'name pic');
		message = await message.populate('chat');
		message = await User.populate<any>(message, {
			path: 'chat.users',
			select: 'name pic email',
		});
		await Chat.findByIdAndUpdate(req.body.chatId, {
			latestMessage: message,
		});
		res.json(message);
	} catch (error: any) {
		console.error(error);
		res.staus(400);
		throw new Error(error.message);
	}
});

/**
 * Fetch All Messages
 */
export const getAllMessages = asyncHandler(async (req, res) => {
	try {
		const messages = await Message.find({
			chat: req.params.chatId,
		})
			.populate('sender', 'name pic email')
			.populate('chat');
		res.json(messages);
	} catch (error: any) {
		console.error(error);
		res.status(400);
		throw new Error(error.message);
	}
});
