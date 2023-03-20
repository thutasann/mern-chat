import mongoose from 'mongoose';
import { MessageProps } from '../types';

const messageModel = new mongoose.Schema<MessageProps>(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		content: {
			type: String,
			trim: true,
		},
		chat: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Chat',
		},
	},
	{
		timestamps: true,
	},
);

export const Message = mongoose.model<MessageProps>('Message', messageModel);
