import { Box, Center, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import Lottie from 'react-lottie';
import { ChatState } from '../context/chat-provider';
import SlideDrawer from '../miscellaneous/Drawer';
import tictacAnimation from '../lottie/game.json';
import canvasDrawAnimation from '../lottie/canvas.json';
import typeAnimation from '../lottie/type.json';
import { GameTypes, GamTypesBtns } from '../types';
import Forms from '../components/canvas-forms/forms';
import { uuid } from '../util';
import TicTacForm from '../components/tic-tac/form';
import { Socket } from 'socket.io-client';
import TypeRaceForm from '../components/tic-tac/type-race-form';

const gameTypes: GamTypesBtns[] = [
	{
		type: 'canvas',
		name: 'Canvas',
		color: 'teal.200',
	},
	{
		type: 'type-race',
		name: 'Typing Race',
		color: 'blue.300',
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
		animationData:
			type === 'tic'
				? tictacAnimation
				: type === 'canvas'
				? canvasDrawAnimation
				: typeAnimation,
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
					<Box
						mt={4}
						display="flex"
						rowGap={3}
						flexDir="row"
						flexWrap="wrap"
						alignItems="center"
						justifyContent="center"
					>
						{gameTypes.map((game) => (
							<Center
								key={game.type}
								w="140px"
								h="50px"
								bg={game.color}
								className="gameTypeBtn"
								onClick={() => setType(game.type)}
								fontWeight={type === game.type ? '800' : 'medium'}
							>
								{game.name}
							</Center>
						))}
					</Box>

					{/* Game Form */}
					<Stack
						mt={6}
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
								mt={6}
								fontSize={23}
								fontWeight={600}
								textAlign="center"
								className="text-slate-700"
							>
								{type === 'tic'
									? 'Tic Tac Toe'
									: type === 'canvas'
									? 'Canvas Drawing'
									: 'Typing Race'}
							</Text>
						</Box>

						{/* Game Forms */}
						<div>
							{type === 'tic' && <TicTacForm socket={socket} />}
							{type === 'canvas' && (
								<Forms
									uuid={uuid}
									socket={socket}
									setUser={setUser}
								/>
							)}
							{type === 'type-race' && <TypeRaceForm />}
						</div>
					</Stack>
				</Box>
			</div>
		</div>
	);
};

export default GamePage;
