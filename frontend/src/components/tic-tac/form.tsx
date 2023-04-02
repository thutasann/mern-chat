import { Button, FormControl, Input } from '@chakra-ui/react';
import React from 'react';

const TicTacForm: React.FC = () => {
	return (
		<>
			<FormControl mt={4}>
				<Input
					placeholder="Enter your Name"
					width={200}
					color="gray.800"
					borderColor="gray"
					roundedRight={0}
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
					background={'teal.600'}
					color="white"
					ml={1}
					borderLeftRadius={0}
					mt={-1}
					_hover={{
						backgroundColor: 'teal',
					}}
				>
					Start Game
				</Button>
			</FormControl>
		</>
	);
};

export default TicTacForm;
