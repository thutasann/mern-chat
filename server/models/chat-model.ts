import mongoose from 'mongoose';
import { ChatProps } from '../types';

const chatModel = new mongoose.Schema<ChatProps>(
	{
		chatName: {
			type: String,
			trim: true,
		},
		isGroupChat: {
			type: Boolean,
			default: false,
		},
		users: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		latestMessage: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Message',
		},
		groupAdmin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	},
);

export const Chat = mongoose.model<ChatProps>('Chat', chatModel);

// module.exports = Chat;
