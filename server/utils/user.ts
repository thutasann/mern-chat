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
