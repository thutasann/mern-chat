export interface UserProps {
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
	chatName: string;
	isGroupChat: boolean;
	users: UserProps[];
	latestMessage: any;
	groupAdmin: any;
}

export interface MessageProps {
	sender: UserProps;
	content: string;
	chat: ChatProps;
}

export interface SendMessagePayloadProps {
	content: string;
	chatId: string;
}
