import {
	Button,
	Center,
	FormControl,
	IconButton,
	Input,
	Stack,
	Text,
} from '@chakra-ui/react';
import React from 'react';
import Lottie from 'react-lottie';
import { ChatState } from '../context/chat-provider';
import SlideDrawer from '../miscellaneous/Drawer';
import gameAnimation from '../lottie/game.json';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: gameAnimation,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice',
	},
};

const GamePage: React.FC = () => {
	const { user } = ChatState();
	return (
		<div>
			{user && <SlideDrawer />}
			<div>
				<Center
					bg="gray.200"
					height="100vh"
				>
					<Stack
						display={'flex'}
						flexDirection="column"
						alignItems={'center'}
						overflowY={'hidden'}
						gap={10}
					>
						<div>
							<Lottie
								options={defaultOptions}
								width={250}
							/>
							<Text
								fontSize={23}
								fontWeight={600}
								textAlign="center"
							>
								TIC-TAC-TOE
							</Text>
						</div>
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
							<FormControl mt={4}>
								<Input
									placeholder="Enter your Name"
									width={200}
									color="gray.800"
									borderColor="gray"
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
									background={'teal'}
									color="white"
									colorScheme={'teal'}
									ml={1}
									mt={-1}
								>
									Start Game
								</Button>
							</FormControl>
						</div>
					</Stack>
				</Center>
			</div>
		</div>
	);
};

export default GamePage;
