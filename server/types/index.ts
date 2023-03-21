export interface UserProps {
	_id: string;
	name: string;
	email: string;
	password: string;
	pic: string;
	isAdmin: boolean;
}

export interface LoginUserProps {
	email: string;
	password: string;
}

export interface ChatProps {
	_id: string;
	chatName: string;
	isGroupChat: boolean;
	users: UserProps[];
	latestMessage: any;
	groupAdmin: any;
}

export interface MessageProps {
	_id: string;
	sender: UserProps;
	content: string;
	chat: ChatProps;
}

export interface SendMessagePayloadProps {
	content: string;
	chatId: string;
}

export type SocketNames = 'setup' | 'off' | 'joinChat' | 'newMessage';

export type SocketEmitNames = 'connected' | 'messageReceived';
