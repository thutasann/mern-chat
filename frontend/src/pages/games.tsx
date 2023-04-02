import { Box, Center, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import Lottie from 'react-lottie';
import { ChatState } from '../context/chat-provider';
import SlideDrawer from '../miscellaneous/Drawer';
import tictacAnimation from '../lottie/game.json';
import canvasDrawAnimation from '../lottie/canvas.json';
import { GameTypes, GamTypesBtns } from '../types';
import Forms from '../components/canvas-forms/forms';
import { uuid } from '../util';
import TicTacForm from '../components/tic-tac/form';
import { Socket } from 'socket.io-client';

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

interface GamePageProps {
	socket: Socket;
	setUser: any;
}

const GamePage: React.FC<GamePageProps> = ({ socket, setUser }) => {
	const { user: loggedInUser } = ChatState();
	const [type, setType] = useState<GameTypes>('canvas');

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: type === 'tic' ? tictacAnimation : canvasDrawAnimation,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	return (
		<div>
			{loggedInUser && <SlideDrawer />}

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
						{/* Game Info */}
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
								className="text-slate-700"
							>
								{type === 'tic' ? 'Tic Tac Toe' : 'Canvas Drawing'}
							</Text>
						</Box>

						{/* Game Forms */}
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
