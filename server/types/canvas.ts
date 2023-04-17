/**
 * This file Containes all of the Types for Games
 */

export type RoomTypes = {
	name: string;
	roomId: string;
	userId: string;
	host: boolean;
	presenter: boolean;
	socketId?: any;
};

export type PlayerProps = {
	_id?: string;
	currentWordIndex?: number;
	socketId: string;
	isPartyLeader?: boolean;
	WPM?: number;
	nickName: string;
};

export type TypeRaceGameProps = {
	words: string[];
	isOpen: boolean;
	isOver: boolean;
	players: PlayerProps[] | any;
	startTime: number;
};

export type RandomQuotesProps = {
	_id: string;
	content: string;
	author: string;
	authorSlug: string;
	length: number;
	tags: string[];
};

export type TypeRaceSockets =
	| 'create-game'
	| 'update-game'
	| 'join-game'
	| 'timer'
	| 'user-input'
	| 'done';

export type VideoSockets =
	| 'me'
	| 'callEnded'
	| 'callUser'
	| 'callAccepted'
	| 'answerCall';

export type VideoCallUser = {
	userToCall: any;
	signalData: any;
	from: any;
	to: any;
	name: string;
	signal: any;
};

export type TypeRaceJoinRoomPayloadProps = {
	nickName: string;
	gameId: string;
};

export interface TypeRaceInputProps {
	input: string;
	gameId: string;
}
