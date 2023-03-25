import { ArrowBackIcon } from '@chakra-ui/icons';
import { Button, FormControl, IconButton, Input } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const TicTacForm: React.FC = () => {
	return (
		<>
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
					borderLeftRadius={0}
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
		</>
	);
};

export default TicTacForm;
