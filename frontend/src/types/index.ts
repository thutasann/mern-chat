import React from 'react';

export interface UserProps {
	_id: string;
	name: string;
	email: string;
	pic: string;
	token: string;
	isAdmin?: boolean;
}

export interface InitialContextProps {
	user: UserProps | any;
	setUser: React.Dispatch<React.SetStateAction<any>>;
}
