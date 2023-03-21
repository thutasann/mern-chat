import { MessageProps, UserProps } from '../types';

export const getSender = (loggedUser: UserProps | any, users: UserProps[]) => {
	return users[0]?._id === loggedUser?._id ? users[1]?.name : users[0]?.name;
};

export const getFullSender = (
	loggedUser: UserProps | any,
	users: UserProps[],
): UserProps => {
	return users[0]?._id === loggedUser?._id ? users[1] : users[0];
};

/**
 * Is Same Sender
 * @param messages - Messages
 * @param m - Current Message
 * @param i - Index of the Current Message
 * @param userId - LoggedIn UserId
 * @returns
 */
export const isSameSender = (
	messages: MessageProps[],
	m: MessageProps,
	i: number,
	userId: string,
) => {
	return (
		i < messages.length - 1 &&
		(messages[i + 1].sender._id !== m.sender._id ||
			messages[i + 1].sender._id === undefined) &&
		messages[i].sender._id !== userId
	);
};

/**
 * Is Last Message
 * @param messages - Messages
 * @param i - Index of the Current Message
 * @param uesrId - LoggedIn UserId
 * @returns
 */
export const isLastMessage = (
	messages: MessageProps[],
	i: number,
	uesrId: string,
) => {
	return (
		i === messages.length - 1 &&
		messages[messages.length - 1].sender._id !== uesrId &&
		messages[messages.length - 1].sender._id
	);
};

/**
 * Is Same Sender Margin
 * @param messages - Messages
 * @param m - Message
 * @param i - Index of the Current Message
 * @param userId - LoggedIn UserId
 * @returns
 */
export const isSameSenderMargin = (
	messages: MessageProps[],
	m: MessageProps,
	i: number,
	userId: string,
) => {
	if (
		i < messages.length - 1 &&
		messages[i + 1].sender._id === m.sender._id &&
		messages[i].sender._id !== userId
	) {
		return 33;
	} else if (
		(i < messages.length - 1 &&
			messages[i + 1].sender._id !== m.sender._id &&
			messages[i].sender._id !== userId) ||
		(i === messages.length - 1 && messages[i].sender._id !== userId)
	) {
		return 0;
	} else return 'auto';
};

/**
 * Is Same User
 * @param messages - Messages
 * @param m - Message
 * @param i - Index of the Current Message
 * @returns
 */
export const isSameUser = (
	messages: MessageProps[],
	m: MessageProps,
	i: number,
) => {
	return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
