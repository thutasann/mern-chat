import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import userRoutes from './routes/user-routes';
import chatRoutes from './routes/chat-routes';
import messageRoutes from './routes/message-routes';
import { ErrorHandler, NotFound } from './middlewares/error-middleware';
import cors from 'cors';
import { Server } from 'socket.io';
import {
	ChatProps,
	JoinRoomPayload,
	MessageProps,
	RoomUser,
	SocketEmitNames,
	SocketNames,
	TicTacSockets,
	TimerPayloadProps,
	UserProps,
} from './types';
import {
	PlayerProps,
	RoomTypes,
	TypeRaceInputProps,
	TypeRaceJoinRoomPayloadProps,
	TypeRaceSockets,
	VideoCallUser,
	VideoSockets,
} from './types/canvas';
import { addUser } from './utils/user';
import {
	AddUser,
	NewGame,
	GetGameDetail,
	CheckWin,
	RemoveRoom,
	UserLeft,
} from './utils/tictactoe';
import { TypeRaceGame } from './models/type-race-game/player-model';
import { getQuoteData } from './utils/quotable-api';
import { calculateTime, calculateWPM } from './utils/game-clock';

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.use(
	cors({
		origin: [
			'http://localhost:3000',
			'http://localhost:3001',
			'https://mern-t-chat.vercel.app',
		],
	}),
);

// Routes
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);
app.use(NotFound);
app.use(ErrorHandler);

// Server Listen
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
	console.log(`Server is Running on PORT : ${PORT} 🚀`);
});

// Socket IO
const io: Server = new Server(server, {
	pingTimeout: 60000,
	cors: {
		origin: [
			'http://localhost:3000',
			'http://localhost:3001',
			'https://mern-t-chat.vercel.app',
		],
	},
});

/**
 * SOCKET CONNECTIONS
 */

let roomIdGlobal;

io.on('connection', (socket) => {
	// setup
	socket.on<SocketNames>('setup', (userData: UserProps) => {
		socket.join(userData._id);
		socket.emit<SocketEmitNames>('connected');
	});

	// join chat
	socket.on<SocketNames>('joinChat', (room: ChatProps) => {
		socket.join(room._id);
		console.log('User Joined Room: ' + room);
	});

	// typing
	socket.on<SocketNames>('typing', (room: ChatProps) => {
		socket.in(room._id).emit<SocketNames>('typing');
	});

	// stopTyping
	socket.on<SocketNames>('stopTyping', (room: ChatProps) => {
		socket.in(room._id).emit<SocketNames>('stopTyping');
	});

	// new Message
	socket.on<SocketNames>('newMessage', (newMessageReceived: MessageProps) => {
		var chat = newMessageReceived.chat;
		if (!chat?.users) return console.log('chat.users not defined');

		chat.users.forEach((user) => {
			if (user._id === newMessageReceived.sender._id) return;
			socket
				.in(user._id)
				.emit<SocketEmitNames>('messageReceived', newMessageReceived);
		});
	});

	// socket Off
	socket.off('setup', (userData: UserProps) => {
		socket.leave(userData._id);
	});

	// userJoined (Canvas)
	socket.on<SocketNames>('userJoined', (data: RoomTypes) => {
		const { name, userId, roomId, host, presenter } = data;
		roomIdGlobal = roomId;
		socket.join(roomId);

		const users = addUser({
			name,
			userId,
			roomId,
			host,
			presenter,
			socketId: socket.id,
		});

		// User Is Joined
		socket.emit<SocketEmitNames>('userIsJoined', { success: true, users });

		// user Joined message
		socket.broadcast
			.to(roomId)
			.emit<SocketEmitNames>('userJoinedMessageBoradcasted', name);

		// all joiners
		socket.broadcast.to(roomId).emit<SocketEmitNames>('allUsers', users);
	});

	// Draw (Canvas)
	socket.on<SocketNames>('draw', (data: any) => {
		socket.broadcast.emit<SocketEmitNames>('isDraw', data);
	});

	// Join Room (TicTacToe)
	socket.on<TicTacSockets>('joinRoom', (payload: JoinRoomPayload) => {
		AddUser(socket.id, payload.roomId);

		const user: RoomUser = {
			socketId: socket.id,
			username: payload.username,
			roomId: payload.roomId,
		};

		NewGame(payload.roomId, payload.userId, payload.username);

		socket.join(user.roomId);

		socket.emit<TicTacSockets>('message', 'Welcome to MERN-Tic');
	});

	// Join Existing Room (TicTacToe)
	socket.on<TicTacSockets>('joinExistingRoom', (payload: JoinRoomPayload) => {
		AddUser(socket.id, payload.roomId);

		const user: RoomUser = {
			socketId: socket.id,
			username: payload.username,
			roomId: payload.roomId,
		};

		const roomExists = GetGameDetail(payload.roomId);

		if (!roomExists) {
			socket.emit<TicTacSockets>('message', {
				error: 'Room does not exist',
			});
			return;
		}

		if (!NewGame(payload.roomId, payload.userId, payload.username)) {
			socket.emit<TicTacSockets>('message', {
				error: 'Room is Full',
			});
			return;
		}

		socket.join(user.roomId);

		socket.emit<TicTacSockets>('message', 'Welcome to Mern TIC');

		socket
			.to(payload.roomId)
			.emit<TicTacSockets>('userJoined', `${payload.username} joined the game`);

		return;
	});

	// Users Entered (TicTacToe)
	socket.on<TicTacSockets>('usersEntered', (payload: JoinRoomPayload) => {
		console.log('Users Entered');
		const current_game = GetGameDetail(payload.roomId);

		if (!current_game) {
			return;
		}

		if (current_game.user1.userId === payload.userId) {
			current_game.user1.inGame = true;
		} else if (current_game.user2.userId === payload.userId) {
			current_game.user2.inGame = true;
		}

		if (current_game.user1.inGame && current_game.user2.inGame) {
			io.in(payload.roomId).emit<TicTacSockets>('usersEntered', {
				user1: current_game.user1,
				user2: current_game.user2,
			});
		}
	});

	// Move (TicTacToe)
	socket.on<TicTacSockets>('move', async (payload: JoinRoomPayload) => {
		const current_room = GetGameDetail(payload.roomId)!;
		let current_username;
		let moveCount;

		if (!current_room.user1.userId || !current_room.user2.userId) {
			io.in(payload.roomId).emit<TicTacSockets>('userLeave', {});
		}

		if (current_room?.user1.userId === payload.userId) {
			current_room.user1.moves.push(payload.move);
			moveCount = current_room.user1.moves.length;
			current_username = current_room.user1.username;
		} else {
			current_room?.user2.moves.push(payload.move);
			moveCount = current_room?.user2.moves.length;
			current_username = current_room?.user2.username;
		}

		io.in(payload.roomId).emit<TicTacSockets>('move', {
			move: payload.move,
			userId: payload.userId,
		});

		if (moveCount >= 3) {
			const { isWin, winCount, pattern } = CheckWin(
				payload.roomId,
				payload.userId,
			);

			if (isWin) {
				io.in(payload.roomId).emit<TicTacSockets>('win', {
					userId: payload.userId,
					username: current_username,
					pattern,
				});
				return;
			}

			if (
				current_room?.user1.moves.length + current_room.user2.moves.length >=
				9
			) {
				io.in(payload.roomId).emit<TicTacSockets>('draw', {
					roomId: payload.roomId,
				});
				return;
			}
		}
	});

	// Rematch (TicTacToe)
	socket.on<TicTacSockets>('reMatch', (payload: JoinRoomPayload) => {
		let currGameDetail = GetGameDetail(payload.roomId)!;
		currGameDetail.user1.moves = [];
		currGameDetail.user2.moves = [];

		io.in(payload.roomId).emit<TicTacSockets>('reMatch', {
			currGameDetail,
		});
	});

	// Remove Room (TicTacToe)
	socket.on<TicTacSockets>('removeRoom', (payload: JoinRoomPayload) => {
		io.in(payload.roomId).emit('removeRoom', 'remove');
		RemoveRoom(payload.roomId);
	});

	// Create Game (Type Race)
	socket.on<TypeRaceSockets>('create-game', async (nickName: string) => {
		try {
			const quotableData = await getQuoteData();
			let game = new TypeRaceGame();
			game.words = quotableData;
			let player: PlayerProps = {
				socketId: socket.id,
				isPartyLeader: true,
				nickName,
			};
			game.players.push(player);
			game = await game.save();

			const gameID = game._id.toString();
			socket.join(gameID);
			io.to(gameID).emit<TypeRaceSockets>('update-game', game);
		} catch (error) {
			console.log('Create Game Error => ', error);
		}
	});

	// Join Game (Type Race)
	socket.on<TypeRaceSockets>(
		'join-game',
		async ({ gameId: _id, nickName }: TypeRaceJoinRoomPayloadProps) => {
			try {
				let game = await TypeRaceGame.findById(_id);
				if (game?.isOpen) {
					const gameId = game._id.toString();
					socket.join(gameId);
					let player: PlayerProps = {
						socketId: socket.id,
						nickName,
					};
					game.players.push(player);
					game = await game.save();
					io.to(gameId).emit<TypeRaceSockets>('update-game', game);
				}
			} catch (error) {
				console.log(error);
			}
		},
	);

	// Timer (Type Race)
	socket.on<TypeRaceSockets>(
		'timer',
		async ({ playerId, gameId }: TimerPayloadProps) => {
			let countDown: number = 5;
			let game = await TypeRaceGame.findById(gameId);
			let player = game?.players.id(playerId);

			if (player === undefined) {
				io.to(gameId).emit<TypeRaceSockets>('timer', {
					countDown: 0,
					msg: 'There is no Player, TryAgain',
				});
				io.to(gameId).emit<TypeRaceSockets>('update-game', game);
			}

			if (player?.isPartyLeader) {
				let timerId = setInterval(async () => {
					if (countDown >= 0) {
						io.to(gameId).emit<TypeRaceSockets>('timer', {
							countDown,
							msg: 'Starting Game in...',
						});
						io.to(gameId).emit<TypeRaceSockets>('update-game', game);
						countDown--;
					} else {
						if (game) {
							game.isOpen = false;
							game = await game.save();
							io.to(gameId).emit<TypeRaceSockets>('update-game', game);
							startGameClock(gameId);
							clearInterval(timerId);
						}
					}
				}, 1000);
			}
		},
	);

	// UserInput (Type Race)
	socket.on<TypeRaceSockets>(
		'user-input',
		async ({ input, gameId }: TypeRaceInputProps) => {
			console.log('input', input);
			try {
				let game = await TypeRaceGame.findById(gameId);
				if (!game?.isOpen && !game?.isOver) {
					let player = game?.players.find(
						(player: PlayerProps) => player.socketId === socket.id,
					);
					let word = game?.words[player.currentWordIndex];
					console.log('word', word);
					if (word === input) {
						player.currentWordIndex++;
						console.log('player.currentWordIndex', player.currentWordIndex);
						if (player.currentWordIndex !== game?.words.length) {
							if (game) {
								game = await game?.save();
								io.to(gameId).emit<TypeRaceSockets>('update-game', game);
							}
						} else {
							if (game) {
								let endTime = new Date().getTime();
								let { startTime } = game;
								player.WPM = calculateWPM(endTime, startTime, player);
								game = await game?.save();
								socket.emit<TypeRaceSockets>('done');
								io.to(gameId).emit<TypeRaceSockets>('update-game', game);
							}
						}
					}
				}
			} catch (error) {
				console.error(error);
			}
		},
	);

	// Me (Video Call)
	socket.emit<VideoSockets>('me', socket.id);

	// Call User (Video call)
	socket.on<VideoSockets>('callUser', (data: VideoCallUser) => {
		io.to(data.userToCall).emit<VideoSockets>('callUser', {
			signal: data.signalData,
			from: data.from,
			name: data.name,
		});
	});

	// Answer Call (Video Call)
	socket.on<VideoSockets>('answerCall', (data: VideoCallUser) => {
		io.to(data.to).emit<VideoSockets>('callAccepted', data.signal);
	});

	// Disconnect
	socket.on<TicTacSockets>('disconnect', () => {
		const roomId = UserLeft(socket.id)!;
		io.in(roomId).emit<TicTacSockets>('userLeave', { roomId });

		socket.broadcast.emit<VideoSockets>('callEnded');
	});
});

/**
 * Start Game Clock Util
 * @param {string} gameId
 */
async function startGameClock(gameId: string) {
	let game = await TypeRaceGame.findById(gameId);
	if (game) {
		game.startTime = new Date().getTime();
		game = await game.save();
		let time: number = 120;

		let timerID = setInterval(
			(function getIntervalFunc() {
				if (time >= 0) {
					const formatTime = calculateTime(time);
					io.to(gameId).emit<TypeRaceSockets>('timer', {
						countDown: formatTime,
						msg: 'Time Remaining',
					});
					time--;
				} else {
					(async () => {
						let endTime = new Date().getTime();
						let game = await TypeRaceGame.findById(gameId);

						if (game) {
							let { startTime } = game;
							game.isOver = true;
							game.players.forEach((player: PlayerProps, index: number) => {
								if (player.WPM === -1 && game) {
									game.players[index].WPM = calculateWPM(
										endTime,
										startTime,
										player,
									);
								}
							});
							game = await game.save();
							io.to(gameId).emit<TypeRaceSockets>('update-game', game);
							// @ts-ignore
							clearInterval(timerID);
						}
					})();
				}
				return getIntervalFunc;
			})(),
			1000,
		);
	}
}
