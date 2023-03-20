import { UserProps } from '../types';

export const getSender = (loggedUser: UserProps | any, users: UserProps[]) => {
	return users[0]?._id === loggedUser?._id ? users[1]?.name : users[0]?.name;
};

export const getFullSender = (
	loggedUser: UserProps | any,
	users: UserProps[],
): UserProps => {
	return users[0]?._id === loggedUser?._id ? users[1] : users[0];
};
