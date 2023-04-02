import { Button, FormControl, Input } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { addUser } from '../../store/actions/tic-actions';
import { useAppDispatch } from '../../store/hook';

const TicTacForm: React.FC = () => {
	const userId: string = nanoid(5);
	const dispatch = useAppDispatch();
	const [userName, setUserName] = useState<string>('');
	const [show, setShow] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	function HandleClick() {
		if (userName === '') {
			setError('Please Enter your Name');
			return;
		}
		dispatch(addUser(userName, userId));
		setShow(true);
	}

	return (
		<>
			<FormControl mt={4}>
				<Input
					placeholder="Enter your Name"
					width={200}
					color="gray.800"
					borderColor="gray"
					roundedRight={0}
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
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
