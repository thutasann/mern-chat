import { RoomTypes } from '../types/canvas';

let users: RoomTypes[] = [];

/**
 * Add user
 * @param { RoomTypes } RoomTypes - RoomTypes
 * @returns { [RoomTypes]  } RoomTypesArrays
 */
export const addUser = ({
	name,
	userId,
	roomId,
	host,
	presenter,
	socketId,
}: RoomTypes): RoomTypes[] => {
	const user = { name, userId, roomId, host, presenter, socketId };
	users.push(user);
	return users.filter((user) => user.roomId === roomId);
};

/**
 * Remove User
 * @param { string } id - SockeID
 * @returns RemovedUser
 */
export const removeUser = (id: string) => {
	const index = users?.findIndex((user) => user.socketId === id);
	if (index !== -1) {
		return users?.splice(index, 1)[0];
	}
};

/**
 * Get Sinngle
 * @param { string } id - UserID
 * @return User
 */
export const getUser = (id: string) => {
	return users.find((user) => user.socketId === id);
};

/**
 * Get all Users
 * @param { string } roomId - RoomId
 * @return { Array<RoomTypes> } RoomTypesArray
 */
export const getUsersInRoom = (roomId: string): Array<RoomTypes> => {
	return users.filter((user) => user.roomId === roomId);
};
