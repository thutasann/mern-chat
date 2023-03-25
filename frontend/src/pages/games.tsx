import { Box, Center, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { ChatState } from '../context/chat-provider';
import SlideDrawer from '../miscellaneous/Drawer';
import tictacAnimation from '../lottie/game.json';
import canvasDrawAnimation from '../lottie/canvas.json';
import {
	DataResponseTypes,
	GameTypes,
	GamTypesBtns,
	RoomProps,
	RoomTypes,
	SocketNames,
} from '../types';
import { toast, ToastContainer } from 'react-toastify';
import Forms from '../components/canvas-forms/forms';
import { uuid } from '../util';
import TicTacForm from '../components/tic-tac/form';
import { PROD_ENDPOINT } from '../util/constants';
import { io } from 'socket.io-client';
import { Route, Routes } from 'react-router-dom';
import CanvasPage from './canvas-page';
import { Socket } from 'dgram';

const gameTypes: GamTypesBtns[] = [
	{
		type: 'canvas',
		name: 'Canvas Draw',
		color: 'teal.200',
	},
	{
		type: 'tic',
		name: 'Tic Tac Toe',
		color: 'red.200',
	},
];

const server = PROD_ENDPOINT;
const connectionOptions = {
	'force new connection': true,
	reconnectionAttempt: 'Infinity',
	timeout: 10000,
	transports: ['websocket'],
};

const socket = io(server, connectionOptions);

const GamePage: React.FC = () => {
	const { user: loggedInUser } = ChatState();
	const [user, setUser] = useState(null);
	const [users, setUsers] = useState<RoomTypes[]>([]);
	const [type, setType] = useState<GameTypes>('canvas');

	// lottie
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: type === 'tic' ? tictacAnimation : canvasDrawAnimation,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	useEffect(() => {
		// userIsJoined
		socket.on<SocketNames>('userIsJoined', (data: DataResponseTypes) => {
			console.log('data', data);
			if (data.success) {
				console.log('userJoined');
				setUsers(data.users);
			} else {
				console.log('userJoined error');
			}
		});

		// allUsers
		socket.on<SocketNames>('allUsers', (data: any[]) => {
			setUsers(data);
		});

		// userJoined Message
		socket.on<SocketNames>('userJoinedMessageBoradcasted', (data: string) => {
			console.log('message', data);
			toast.info(`${data} joined the room`);
		});

		// userLeft Message
		socket.on<SocketNames>('userLeftMessageBroadcasted', (data: string) => {
			toast.warning(`${data} left the room`);
		});
	});

	return (
		<div>
			{loggedInUser && <SlideDrawer />}

			<ToastContainer />

			<div className="gameWrapper">
				<Box
					bg="white"
					height="100vh"
				>
					{/* Game Type Buttons */}
					<Center>
						<Wrap mt={4}>
							{gameTypes.map((game) => (
								<WrapItem key={game.type}>
									<Center
										w="150px"
										h="50px"
										bg={game.color}
										className="gameTypeBtn"
										onClick={() => setType(game.type)}
										style={{
											fontWeight: type === game.type ? 600 : 500,
										}}
									>
										{game.name}
									</Center>
								</WrapItem>
							))}
						</Wrap>
					</Center>

					{/* Game Form */}
					<Stack
						display={'flex'}
						flexDirection="column"
						alignItems={'center'}
						overflowY={'hidden'}
					>
						<Box>
							<Lottie
								options={defaultOptions}
								width={250}
								isClickToPauseDisabled
							/>
							<Text
								fontSize={23}
								fontWeight={600}
								textAlign="center"
							>
								{type === 'tic' ? 'Tic Tac Toe (Beta)' : 'Canvas Drawing'}
							</Text>
						</Box>
						<div>
							{type === 'tic' && <TicTacForm />}

							{type === 'canvas' && (
								<Forms
									uuid={uuid}
									socket={socket}
									setUser={setUser}
								/>
							)}
						</div>
					</Stack>
				</Box>
			</div>
		</div>
	);
};

export default GamePage;
