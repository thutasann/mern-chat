import React from 'react';

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
	| 'stopTyping';

export type GameTypes = 'canvas' | 'tic';

export interface GamTypesBtns {
	type: GameTypes;
	name: string;
	color: string;
}
