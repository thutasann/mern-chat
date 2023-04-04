import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { ChatState } from '../context/chat-provider';
import SlideDrawer from '../miscellaneous/Drawer';
import { useAppSelector } from '../store/hook';
import {
	MoveProps,
	TicGameDetails,
	TicTacSockets,
	WinPayloadProps,
} from '../types';
import { moves } from '../util/constants';
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverArrow,
	PopoverCloseButton,
} from '@chakra-ui/react';
import { BsFillInfoCircleFill } from 'react-icons/bs';

interface TicTacToePageProps {
	socket: Socket;
}

const loadingText: string = 'waiting for another player...';

const TicTacToePage: React.FC<TicTacToePageProps> = ({ socket }) => {
	const { user: loggedInUser } = ChatState();
	const { user } = useAppSelector((state) => state.ticUser);
	console.log('user', user);
	const params = useParams<{ roomId?: string }>();

	const [roomId, setRoomId] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [loadingValue, setLoadingValue] = useState<string>(loadingText);
	const [userJoined, setUserJoined] = useState<boolean>(false);
	const [userTurn, setUserTurn] = useState<boolean>(false);
	const [oponentName, setOponentName] = useState<string>('');
	const [move, setMove] = useState<MoveProps>({
		move: 0,
		myMove: false,
	});
	const [allMoves, setAllMoves] = useState<MoveProps[]>([]);
	const [winner, setWinner] = useState<string>('');
	const [winnerId, setWinnerId] = useState<string>('');
	const [winPattern, setWinPattern] = useState<any[]>([]);
	const [gameEnd, setGameEnd] = useState<boolean>(false);
	const [leaveRoom, setLeaveRoom] = useState<boolean>(false);
	const [myScore, setMyScroe] = useState<number>(0);
	const [oponentScore, setOponentScore] = useState<number>(0);

	// Setting RoomID
	useEffect(() => {
		setRoomId(params.roomId!);
	}, [params.roomId]);

	// remove Room
	useEffect(() => {
		window.onbeforeunload = function () {
			window.setTimeout(function () {
				window.location.href = '/';
				socket.emit<TicTacSockets>('removeRoom');
			}, 0);
			window.onbeforeunload = null;
		};

		window.history.pushState(null, document.title, window.location.href);
		window.addEventListener('popstate', function () {
			window.history.pushState(null, document.title, this.window.location.href);
		});
	});

	// User Entered
	useEffect(() => {
		if (!user) {
			window.location.href = '/games';
		}
		socket.emit<TicTacSockets>('usersEntered', {
			roomId: params.roomId,
			userId: user.userId,
		});

		socket
			.off<TicTacSockets>('usersEntered')
			.on<TicTacSockets>('usersEntered', (data: TicGameDetails) => {
				if (data.user1.userId !== user.userId) {
					setOponentName(data.user1.username);
				} else {
					setOponentName(data.user2.username);
				}
				setLoading(false);
			});
	}, [socket, user, params.roomId]);

	// Move / Win / Draw
	useEffect(() => {
		socket.on<TicTacSockets>('move', (payload: MoveProps) => {
			setMove({
				move: payload.move,
				myMove: payload.userId === user.userId,
			});
			setAllMoves([...allMoves, move]);

			moves[payload.move].move = 1;
			moves[payload.move].myMove = payload.userId === user.userId;

			if (payload.userId !== user.userId) {
				setUserTurn(false);
			}
		});

		socket.on<TicTacSockets>('win', (payload: WinPayloadProps) => {
			setWinPattern(payload.pattern);
			setGameEnd(true);
			if (payload.userId === user.userId) {
				setWinner('You Won!');
				setMyScroe(myScore + 1);
			} else {
				setWinner(`The winner is ${payload.username}`);
				setOponentScore(oponentScore + 1);
			}
			setWinnerId(payload.userId);
			setUserTurn(false);
		});

		socket.on<TicTacSockets>('draw', () => {
			setWinner('Draw!');
			setGameEnd(true);
			setUserTurn(false);
			setLoadingValue('');
		});
	});

	// Rematch / RemoveRoom
	useEffect(() => {
		socket.on<TicTacSockets>('reMatch', () => {
			moves.forEach((m) => {
				m.move = -1;
				m.myMove = false;
			});
			setWinner('');
			setUserTurn(user.userId !== winnerId);
			setGameEnd(false);
		});

		socket.on<TicTacSockets>('removeRoom', () => {
			setUserJoined(false);
			setLeaveRoom(true);
		});
	});

	// UserLeave
	useEffect(() => {
		socket.on<TicTacSockets>('userLeave', (payload: any) => {
			console.log('userLeave', payload);
			setLoadingValue('');
			setLoadingValue(`${oponentName} left the game`);
			setLoading(true);
			setUserJoined(false);
		});
	});

	function handleClose() {
		socket.emit<TicTacSockets>('removeRoom', { roomId });
		return true;
	}

	function handleMoveClick(m: any) {
		if (loading && !userJoined) return;
		socket.emit<TicTacSockets>('move', {
			move: m,
			roomId,
			userId: user.userId,
		});

		moves[m].move = 1;
		moves[m].myMove = true;

		setUserTurn(true);
	}

	function handlePlayAgain() {
		socket.emit<TicTacSockets>('reMatch', { roomId });
	}

	return (
		<div>
			{loggedInUser && <SlideDrawer />}
			<div className="mainWrapper">
				<div className="flex items-center gap-2 mb-3">
					<h1 className="font-semibold text-2xl uppercase">Tic Tac Toe</h1>
					<Popover>
						<PopoverTrigger>
							<button>
								<BsFillInfoCircleFill
									size={20}
									className="text-gray-700 hover:text-gray-600"
								/>
							</button>
						</PopoverTrigger>
						<PopoverContent>
							<PopoverArrow />
							<PopoverCloseButton />
							<PopoverHeader fontWeight={600}>Room Info!</PopoverHeader>
							<PopoverBody>
								<div className="mb-2">
									<span className="font-bold">RoomID : </span>{' '}
									<span>{roomId}</span>{' '}
								</div>
								<p className="text-[14px] font-[500]">
									You are now arrving at <br /> the Tic-Tac-Toe Game Room.
								</p>
							</PopoverBody>
						</PopoverContent>
					</Popover>
				</div>
				<div className="flex items-center gap-3 mt-4">
					<div className="score bg-gradient-to-tr from-teal-400 to-teal-600">
						<p>You</p> <h3>{myScore}</h3>
					</div>
					<h3 className="vsText">VS</h3>
					<div className="score bg-gradient-to-r from-rose-400 to-red-500">
						<p>{oponentName || 'Oponent'} </p> <h3>{oponentScore}</h3>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TicTacToePage;
