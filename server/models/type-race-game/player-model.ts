import mongoose from 'mongoose';
import { PlayerProps, TypeRaceGameProps } from '../../types/canvas';

const PlayerSchema = new mongoose.Schema<PlayerProps>(
	{
		currentWordIndex: {
			type: Number,
			default: 0,
		},
		socketId: {
			type: String,
		},
		isPartyLeader: {
			type: Boolean,
		},
		WPM: {
			type: Number,
			default: -1,
		},
		nickName: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

const GameSchema = new mongoose.Schema<TypeRaceGameProps>({
	words: [
		{
			type: String,
		},
	],
	isOpen: {
		type: Boolean,
		default: true,
	},
	isOver: {
		type: Boolean,
		default: false,
	},
	players: [PlayerSchema],
	startTime: {
		type: Number,
	},
});

export const TypeRaceGame = mongoose.model<TypeRaceGameProps>(
	'TypeRaceGame',
	GameSchema,
);
