import { Button, FormControl, Input, Stack, useToast } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { addUser } from '../../store/actions/tic-actions';
import { useAppDispatch } from '../../store/hook';
import { TicRoomTypesProps } from '../../types';
import { CreateRoomSVG, JoinRoomSVG } from '../illustrations';
import { IoArrowBackOutline } from 'react-icons/io5';

const roomTypebtns: TicRoomTypesProps = [
	{
		type: 'create',
		text: 'Create Room',
	},
	{
		type: 'join',
		text: 'Join Room',
	},
];

const TicTacForm: React.FC = () => {
	const userId: string = nanoid(5);
	const toast = useToast();
	const dispatch = useAppDispatch();
	const [userName, setUserName] = useState<string>('');
	const [show, setShow] = useState<boolean>(false);

	function HandleClick() {
		if (userName === '') {
			toast({
				title: 'Please Enter User Name!',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			return;
		}
		dispatch(addUser(userName, userId));
		setShow(true);
	}

	return (
		<>
			{!show ? (
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
						onClick={HandleClick}
						_hover={{
							backgroundColor: 'teal',
						}}
					>
						Start Game
					</Button>
				</FormControl>
			) : null}

			{show ? (
				<Stack my={4}>
					<button
						className="bg-slate-500 text-white rounded-md px-3 py-2 text-base hover:bg-slate-600 w-[40px]"
						onClick={() => setShow(false)}
					>
						<IoArrowBackOutline size={17} />
					</button>
					<div className="flex flex-col md:flex-row items-center gap-2 cursor-pointer">
						{roomTypebtns.map((type, idx) => (
							<div key={idx}>
								<div className="ticBtns group">
									{type.type === 'create' ? <CreateRoomSVG /> : <JoinRoomSVG />}
									<h3 className="font-[700] text-xl group-hover:text-white">
										{type.text}
									</h3>
								</div>
							</div>
						))}
					</div>
				</Stack>
			) : null}
		</>
	);
};

export default TicTacForm;
