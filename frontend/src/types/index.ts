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
	chatName: string;
	isGroupChat: boolean;
	users: UserProps[];
	latestMessage: any;
	groupAdmin: any;
}

export interface InitialContextProps {
	user: UserProps;
	setUser: React.Dispatch<React.SetStateAction<UserProps | any>>;
	selectedChat: ChatProps;
	setSelectedChat: React.Dispatch<React.SetStateAction<ChatProps | any>>;
	chats: ChatProps[];
	setChats: React.Dispatch<React.SetStateAction<ChatProps[] | any[]>>;
}
