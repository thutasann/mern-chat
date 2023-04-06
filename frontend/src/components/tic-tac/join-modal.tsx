import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { JoinRoomSVG } from '../illustrations';
import { Button, FormControl, Input, useToast } from '@chakra-ui/react';
import { Socket } from 'socket.io-client';
import { useAppSelector } from '../../store/hook';
import { TicTacSockets } from '../../types';
import { useNavigate } from 'react-router-dom';

type Props = {
	joinModal: any;
	setJoinModal: any;
	socket: Socket;
};

function JoinModal({ joinModal, setJoinModal, socket }: Props) {
	const { userName, userId } = useAppSelector((state) => state.ticUser.user);
	const toast = useToast();
	const navigate = useNavigate();
	const [joined, setJoined] = useState<boolean>(false);
	const [roomId, setRoomId] = useState<string>('');

	const hanndleClick = () => {
		if (roomId.length === 0) {
			toast({
				title: `Please Enter RoomID`,
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
		}
		socket.emit<TicTacSockets>('joinExistingRoom', {
			username: userName,
			userId,
			roomId,
		});
	};

	useEffect(() => {
		setJoined(false);
		if (!userId) {
			navigate('/games');
		}
		socket.on<TicTacSockets>('message', (payload) => {
			console.log('payload', payload);
			if (payload === 'Welcome to Mern TIC') {
				setJoined(true);
			}
			if (payload.error) {
				toast({
					title: `${payload.error || 'Something went Wrong'}`,
					status: 'error',
					duration: 5000,
					isClosable: true,
					position: 'bottom',
				});
			}
		});
	}, [userId, socket]);

	const closeModal = () => {
		setJoinModal(false);
	};

	return (
		<div>
			<Transition
				appear
				show={joinModal}
				as={Fragment}
			>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={closeModal}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 backdrop-filter backdrop-blur-sm bg-opacity-10" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex items-center justify-center min-h-full p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-gray-50 border border-gray-100 shadow-xl rounded-2xl">
									<Dialog.Title
										as="h3"
										className="flex items-center justify-center 
                                        space-x-2 text-[21px]  leading-6 text-gray-700 font-bold"
									>
										Join Room
									</Dialog.Title>
									<div className="mt-5 flex flex-col items-center">
										<JoinRoomSVG />
										<FormControl
											width="auto"
											mt={3}
											display="flex"
											alignItems="center"
										>
											<Input
												placeholder="Room ID"
												width={120}
												color="gray.800"
												borderColor="gray"
												roundedRight={0}
												value={roomId}
												onChange={(e) => setRoomId(e.target.value)}
												_hover={{
													border: '1px solid gray',
												}}
												_focus={{
													outline: 'none',
													ring: 'none',
													border: '1px solid gray',
												}}
											/>
											<Button
												onClick={hanndleClick}
												disabled={joined}
												variant="solid"
												background={'teal.600'}
												color="white"
												ml={1}
												borderLeftRadius={0}
												_hover={{
													backgroundColor: 'teal',
												}}
											>
												{joined ? 'Joined' : 'join'}
											</Button>
										</FormControl>
										{joined ? (
											<button
												onClick={() => {
													navigate(`/tic-tac-toe/${roomId}`);
												}}
												type="submit"
												className="mt-2 w-[215px] bg-slate-600 text-white py-3 px-4 rounded-md transition-all duration-700 ease-in-out text-[16px] hover:bg-slate-700 font-[700]"
											>
												Play Game
											</button>
										) : null}
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
}

export default JoinModal;
