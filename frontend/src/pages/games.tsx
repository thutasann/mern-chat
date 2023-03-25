import {
	Box,
	Center,
	IconButton,
	Stack,
	Text,
	Wrap,
	WrapItem,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Lottie from 'react-lottie';
import { ChatState } from '../context/chat-provider';
import SlideDrawer from '../miscellaneous/Drawer';
import tictacAnimation from '../lottie/game.json';
import canvasDrawAnimation from '../lottie/canvas.json';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { GameTypes, GamTypesBtns } from '../types';
import { ToastContainer } from 'react-toastify';
import Forms from '../components/canvas-forms/forms';
import { uuid } from '../util';
import TicTacForm from '../components/tic-tac/form';

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

const GamePage: React.FC = () => {
	const { user } = ChatState();
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
			{user && <SlideDrawer />}

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
								width={type === 'tic' ? 250 : 300}
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
							{/* TIC TAC TOE */}
							{type === 'tic' && <TicTacForm />}

							{/* CANVAS */}
							{type === 'canvas' && <Forms uuid={uuid} />}
						</div>
					</Stack>
				</Box>
			</div>
		</div>
	);
};

export default GamePage;
