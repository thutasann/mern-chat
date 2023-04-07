export type RoomTypes = {
	name: string;
	roomId: string;
	userId: string;
	host: boolean;
	presenter: boolean;
	socketId?: any;
};

export type PlayerProps = {
	currentWordIndex: number;
	socketId: string;
	isPartyLeader: boolean;
	WPM: number;
	nickName: string;
};

export type TypeRaceGameProps = {
	words: string[];
	isOpen: boolean;
	isOver: boolean;
	players: PlayerProps[];
	startTime: number;
};
