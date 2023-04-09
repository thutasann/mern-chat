import React from 'react';
import { Socket } from 'socket.io-client';

export interface UserProps {
	_id: string;
	name: string;
	email: string;
	pic: string;
	token: string;
	isAdmin?: boolean;
}

export interface ChatProps {
	_id: string;
	chatName: string;
	isGroupChat: boolean;
	users: UserProps[];
	latestMessage: any;
	groupAdmin: any;
}

export interface NotificationProps {
	_id: string;
	chat: ChatProps;
}

export interface InitialContextProps {
	user: UserProps;
	setUser: React.Dispatch<React.SetStateAction<UserProps | any>>;
	selectedChat: ChatProps;
	setSelectedChat: React.Dispatch<React.SetStateAction<ChatProps | any>>;
	chats: ChatProps[];
	setChats: React.Dispatch<React.SetStateAction<ChatProps[] | any[]>>;
	notification: NotificationProps[];
	setNotification: React.Dispatch<
		React.SetStateAction<NotificationProps[] | any[]>
	>;
}

export interface MessageProps {
	_id: string;
	sender: UserProps;
	content: string;
	chat: ChatProps;
}

export interface SendMessagePayload {
	content: string;
	chatId: string;
}

export type SocketNames =
	| 'setup'
	| 'connected'
	| 'joinChat'
	| 'messageReceived'
	| 'newMessage'
	| 'typing'
	| 'stopTyping'
	| 'userJoined'
	| 'disconnect'
	| 'userIsJoined'
	| 'userJoinedMessageBoradcasted'
	| 'allUsers'
	| 'userLeftMessageBroadcasted'
	| 'userLeft'
	| 'isDraw'
	| 'draw';

export type GameTypes = 'canvas' | 'tic' | 'type-race';

export interface GamTypesBtns {
	type: GameTypes;
	name: string;
	color: string;
}

export interface RoomProps {
	uuid: () => string;
	socket: Socket;
	setUser: any;
}

export type RoomTypes = {
	name: string;
	roomId: string;
	userId: string;
	host: boolean;
	presenter: boolean;
};

export interface DataResponseTypes {
	success: boolean;
	users: RoomTypes[];
}

export type toolType = string | 'pencil' | 'line' | 'rectangle' | '';

export interface textBoxSliceProps {
	B_color: 'white' | string;
	pencolor: 'black' | string;
	stroke: 2;
	canvaVal: null | any;
}

export interface TicUserProps {
	user: {
		userName: string;
		userId: string;
	};
}

export type TicRoomTypesProps = {
	type: 'create' | 'join';
	text: string;
}[];

export type TicTacSockets =
	| 'joinRoom'
	| 'joinExistingRoom'
	| 'usersEntered'
	| 'move'
	| 'reMatch'
	| 'removeRoom'
	| 'disconnectRoom'
	| 'message'
	| 'userJoined'
	| 'userLeave'
	| 'win'
	| 'draw'
	| 'disconnect';

export type TypeRaceSockets =
	| 'create-game'
	| 'update-game'
	| 'join-game'
	| 'timer'
	| 'user-input'
	| 'done';

export interface MoveProps {
	move: number;
	myMove: boolean;
	userId?: string;
}

export interface TicUsers {
	socketId: string;
	roomId: string;
	id?: string;
}

export interface TicGameUser {
	userId: any;
	username: any;
	moves: any[];
	winCount: number;
	inGame: boolean;
}

export interface TicGameDetails {
	room: any;
	user1: TicGameUser;
	user2: TicGameUser;
}

export interface JoinRoomPayload {
	username: string;
	userId: string;
	roomId: string;
	move: any;
}

export interface RoomUser {
	socketId: any;
	username: string;
	roomId: string;
}

export interface WinPayloadProps {
	pattern: any;
	userId: string;
	username: string;
}

/**
 * Type Race Game
 */
export type PlayerProps = {
	_id: string;
	currentWordIndex?: number;
	socketId: string;
	isPartyLeader: boolean;
	WPM: number;
	nickName: string;
};

export type TypeRaceGameProps = {
	_id: string;
	words: string[];
	isOpen: boolean;
	isOver: boolean;
	players: PlayerProps[];
	startTime?: number;
};

export interface ReduxTypeRaceGameProps {
	typeRaceGame: TypeRaceGameProps;
}

export type TypeRaceJoinRoomPayloadProps = {
	nickName: string;
	gameId: string;
};

export interface TimerProps {
	countDown: string;
	msg: string;
}

export interface TypeRaceInputProps {
	input: string;
	gameId: string;
}
