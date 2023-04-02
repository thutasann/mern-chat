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

export type GameTypes = 'canvas' | 'tic';

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
