import { TicGameDetails, TicUsers } from '../types';

const users: TicUsers[] = [];
const gameDetails: TicGameDetails[] = [];

/**
 * Add User
 * @param socketId
 * @param roomId
 */
export function AddUser(socketId: string, roomId: string) {
	users.push({
		socketId,
		roomId,
	});
}

/**
 * Get Current User
 * @param id
 * @returns
 */
export function GetCurrentUser(id: string) {
	return users.find((user) => user.id === id);
}

/**
 * User Leave
 * @param id
 * @returns
 */
export function UserLeave(id: string) {
	const index = users.findIndex((user) => user.id === id);
	if (index !== -1) {
		return users.splice(index, 1)[0];
	}
}

/**
 * New Game
 * @param room
 * @param userId
 * @param username
 * @returns
 */
export function NewGame(room: any, userId: any, username: any) {
	let isRoomExist = gameDetails.find((item) => item.room === room);
	console.log('isRoomExist', isRoomExist);
	if (!isRoomExist) {
		let newGameDetail: TicGameDetails;
		newGameDetail = {
			room,
			user1: {
				userId,
				username,
				moves: [],
				winCount: 0,
				inGame: false,
			},
			user2: {
				userId: 0,
				username: 0,
				moves: [],
				winCount: 0,
				inGame: false,
			},
		};
		gameDetails.push(newGameDetail);
	} else {
		if (isRoomExist.user2.userId === 0 && isRoomExist.user1.userId != userId) {
			isRoomExist.user2.userId = userId;
			isRoomExist.user2.username = username;
		} else {
			return false;
		}
	}
	return true;
}

/**
 * Get Game Detail
 * @param room
 * @returns
 */
export function GetGameDetail(room: any) {
	return gameDetails.find((item) => item.room === room);
}

/**
 * WinPatterns
 */
export const WinPatterns: any[] = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 9],
	[1, 5, 9],
	[3, 5, 7],
];

/**
 * Check Win
 * @param room
 * @param userId
 * @returns
 */
export function CheckWin(room: any, userId: any) {
	let gameDetail = GetGameDetail(room)!;
	let user;
	let curr_user_moves: any;
	let winCount;

	if (gameDetail.user1.userId == userId) {
		user = 1;
		curr_user_moves = gameDetail.user1.moves;
	} else {
		user = 2;
		curr_user_moves = gameDetail.user2.moves;
	}

	let pattern: any;
	let isWin;

	for (let i = 0; i < WinPatterns.length; i++) {
		let win_pattern = WinPatterns[i];
		isWin = true;
		for (let j = 0; j < win_pattern.length; j++) {
			if (!curr_user_moves.includes(win_pattern[j])) {
				isWin = false;
			}
		}
		if (isWin) {
			pattern = i;
			if (user === 1) {
				gameDetail.user1.winCount = gameDetail.user1.winCount + 1;
				winCount = gameDetail.user1.winCount;
			} else {
				gameDetail.user2.winCount = gameDetail.user2.winCount + 1;
				winCount = gameDetail.user1.winCount;
			}
			break;
		}
	}

	return {
		isWin,
		winCount,
		pattern,
	};
}

/**
 * Remove Room
 * @param room
 * @returns
 */
export function RemoveRoom(room: any) {
	let index = gameDetails.findIndex((item) => item.room === room);
	if (index !== -1) {
		return gameDetails.splice(index, 1)[0];
	}
}

/**
 * User Left
 * @param socketId
 */
export function UserLeft(socketId: any) {
	if (!users.find((user) => user.socketId === socketId)) {
		return;
	}
	let roomId = users.find((user) => user.socketId === socketId)?.roomId;
	let index = users.findIndex((user) => user.socketId === socketId);
	if (index !== 1) {
		users.splice(index, 1)[0];
	}
	RemoveRoom(roomId);
	return roomId;
}
