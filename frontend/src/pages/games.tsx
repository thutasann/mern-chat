import {
	Box,
	Button,
	Center,
	FormControl,
	IconButton,
	Input,
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
										w="190px"
										h="60px"
										bg={game.color}
										className="gameTypeBtn"
										onClick={() => setType(game.type)}
										style={{
											border: type === game.type ? '1px solid white' : '',
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
						gap={10}
					>
						<Box mt={8}>
							<Lottie
								options={defaultOptions}
								width={type === 'tic' ? 250 : 300}
								isClickToPauseDisabled
							/>
							<Text
								fontSize={23}
								fontWeight={600}
								textAlign="center"
								mt={4}
							>
								{type === 'tic' ? 'Tic Tac Toe (Beta)' : 'Canvas Drawing'}
							</Text>
						</Box>
						<div>
							<Link to="/chats">
								<IconButton
									icon={<ArrowBackIcon fontSize={20} />}
									aria-label={'Back to Chat'}
									color="white"
									backgroundColor={'gray.500'}
									_hover={{
										opacity: 40,
										backgroundColor: '#7E8EA7',
									}}
								/>
							</Link>

							{/* TIC TAC TOE */}
							{type === 'tic' && (
								<FormControl mt={4}>
									<Input
										placeholder="Enter your Name"
										width={200}
										color="gray.800"
										borderColor="gray"
										cursor={'not-allowed'}
										readOnly
										_hover={{
											border: '1px solid teal',
										}}
										_focus={{
											outline: 'none',
											ring: 'none',
											border: '1px solid teal',
										}}
									/>
									<Button
										variant="solid"
										background={'gray'}
										color="white"
										ml={1}
										mt={-1}
										disabled
										cursor={'not-allowed'}
										_hover={{
											backgroundColor: 'gray',
										}}
									>
										Start Game
									</Button>
								</FormControl>
							)}
						</div>
					</Stack>
				</Box>
			</div>
		</div>
	);
};

export default GamePage;
