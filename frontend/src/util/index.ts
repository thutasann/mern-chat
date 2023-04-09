import { Socket } from 'socket.io-client';
import { PlayerProps } from '../types';

export const uuid = () => {
	var S4 = () => {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};
	return (
		S4() +
		S4() +
		'-' +
		S4() +
		'-' +
		S4() +
		'-' +
		S4() +
		'-' +
		S4() +
		S4() +
		S4()
	);
};

export function copyToClipBoard(text: string) {
	navigator.clipboard.writeText(text);
}

/**
 * Find TypeRace Players
 * @param { Array<PlayerProps> } players
 * @param { Socket } socket
 * @returns { PlayerProps  } TypeRace Player
 */
export function findPlayer(
	players: PlayerProps[],
	socket: Socket,
): PlayerProps {
	return players.find((player) => player.socketId === socket.id)!;
}
