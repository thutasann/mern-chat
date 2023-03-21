import { ArrowBackIcon } from '@chakra-ui/icons';
import {
	Box,
	IconButton,
	Spinner,
	Text,
	FormControl,
	Input,
	useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ChatState } from '../../context/chat-provider';
import { ChatBoxProps } from './chat-box';
import { getFullSender, getSender } from '../../config/chat-logic';
import ProfileModal from '../../miscellaneous/profile-modal';
import UpdateGroupChat from './update-group-chat';
import { ChatProps, MessageProps, SocketNames } from '../../types';
import axios, { AxiosRequestConfig } from 'axios';
import ScrollableChat from '../messages/scrollable-chat';
import io, { Socket } from 'socket.io-client';
import { DEV_ENDPOINT, PROD_ENDPOINT } from '../../util/constants';
import Lottie from 'react-lottie';
import animationData from '../../lottie/animation.json';

var socket: Socket;
var selectedChatCompare: ChatProps;

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: animationData,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice',
	},
};

const SingleChat: React.FC<ChatBoxProps> = ({ fetchAgain, setFetchAgain }) => {
	const { user, selectedChat, setSelectedChat, notification, setNotification } =
		ChatState();
	const toast = useToast();
	const [messages, setMessages] = useState<MessageProps[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [newMessage, setNewMessage] = useState<string>('');
	const [socketConnected, setSocketConnected] = useState<boolean>(false);
	const [typing, setTyping] = useState<boolean>(false);
	const [isTyping, setIsTyping] = useState<boolean>(false);

	// socket
	useEffect(() => {
		socket = io(PROD_ENDPOINT);
		socket.emit<SocketNames>('setup', user);
		socket.on<SocketNames>('connected', () => setSocketConnected(true));
		socket.on<SocketNames>('typing', () => setIsTyping(true));
		socket.on<SocketNames>('stopTyping', () => setIsTyping(false));
	}, []);

	// fetchMessages
	useEffect(() => {
		fetchMessages();
		selectedChatCompare = selectedChat;
	}, [selectedChat]);

	// MessageReceived
	useEffect(() => {
		socket.on<SocketNames>(
			'messageReceived',
			(newMessageReceived: MessageProps) => {
				if (
					!selectedChatCompare ||
					selectedChatCompare._id !== newMessageReceived.chat._id
				) {
					if (!notification.includes(newMessageReceived)) {
						setNotification([newMessageReceived, ...notification]);
						setFetchAgain(!fetchAgain);
					}
				} else {
					setMessages([...messages, newMessageReceived]);
				}
			},
		);
	});

	// Fetch Messages
	const fetchMessages = async () => {
		if (!selectedChat) return;
		try {
			const config: AxiosRequestConfig = {
				baseURL: 'https://api-chat-v0tz.onrender.com',
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			setLoading(true);
			const { data } = await axios.get(
				`/api/message/${selectedChat._id}`,
				config,
			);
			setMessages(data);
			setLoading(false);

			socket.emit<SocketNames>('joinChat', selectedChat._id);
		} catch (error) {
			console.error(error);
			toast({
				title: 'Something went wrong in Fetching Messages!',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			setLoading(false);
		}
	};

	// Send Message
	const sendMessage = async (e: KeyboardEvent | any) => {
		if (e.key === 'Enter' && newMessage) {
			socket.emit<SocketNames>('stopTyping', selectedChat._id);
			try {
				const config: AxiosRequestConfig = {
					baseURL: 'https://api-chat-v0tz.onrender.com',
					headers: {
						Authorization: `Bearer ${user.token}`,
						'Content-Type': 'application/json',
					},
				};
				setNewMessage('');
				const { data } = await axios.post(
					'/api/message',
					{
						content: newMessage,
						chatId: selectedChat._id,
					},
					config,
				);
				socket.emit<SocketNames>('newMessage', data);
				setMessages([...messages, data]);
			} catch (error) {
				console.error(error);
				toast({
					title: 'Something went wrong!',
					status: 'error',
					duration: 5000,
					isClosable: true,
					position: 'bottom',
				});
			}
		}
	};

	// Typing Handler
	const typingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value;
		setNewMessage(value);
		if (!socketConnected) return;

		if (!typing) {
			setTyping(true);
			socket.emit<SocketNames>('typing', selectedChat._id);
		}

		let lastTypingTime = new Date().getTime();
		var timerLength: number = 3000;

		setTimeout(() => {
			var timeNow = new Date().getTime();
			var timeDiff = timeNow - lastTypingTime;

			if (timeDiff >= timerLength && typing) {
				socket.emit<SocketNames>('stopTyping', selectedChat._id);
				setTyping(false);
			}
		}, timerLength);
	};

	return (
		<>
			{selectedChat ? (
				<>
					<Text
						fontSize={{ base: '18px', md: '25px' }}
						pb={3}
						fontWeight={600}
						px={2}
						w="100%"
						display={'flex'}
						gap="7px"
						justifyContent={{
							base: 'space-between',
						}}
						alignItems="center"
					>
						<IconButton
							display={{
								base: 'flex',
								md: 'none',
							}}
							icon={<ArrowBackIcon />}
							onClick={() => setSelectedChat('')}
							aria-label={'back button'}
						/>
						{!selectedChat.isGroupChat ? (
							<>
								{getSender(user, selectedChat.users)}
								<ProfileModal user={getFullSender(user, selectedChat.users)} />
							</>
						) : (
							<>
								<Text color={'gray.700'}>
									{selectedChat.chatName.toUpperCase()}{' '}
								</Text>
								<UpdateGroupChat
									fetchAgain={fetchAgain}
									setFetchAgain={setFetchAgain}
									fetchMessages={fetchMessages}
								/>
							</>
						)}
					</Text>

					<Box
						display={'flex'}
						flexDir="column"
						justifyContent={'flex-end'}
						p={3}
						bg="#E8E8E8"
						w="100%"
						h="100%"
						borderRadius={'lg'}
						overflowY="hidden"
					>
						{loading ? (
							<Spinner
								size="xl"
								w={19}
								h={19}
								alignSelf="center"
								margin="auto"
							/>
						) : (
							<div className="messages">
								<ScrollableChat messages={messages} />
							</div>
						)}
						<FormControl
							onKeyDown={sendMessage}
							isRequired
							mt={3}
						>
							{isTyping ? (
								<div>
									{/* Typing Animation */}
									<Lottie
										options={defaultOptions}
										width={70}
										style={{
											marginBottom: 15,
											marginLeft: 0,
										}}
									/>
								</div>
							) : null}
							<Input
								variant="filled"
								bg="#EFEFEF"
								border="1px solid gray"
								placeholder="Enter a message..."
								onChange={typingHandler}
								value={newMessage}
							/>
						</FormControl>
					</Box>
				</>
			) : (
				<Box
					display={'flex'}
					alignItems="center"
					justifyContent={'center'}
					h="100%"
				>
					<Text
						fontSize={'3xl'}
						pb={3}
						color="lightGray"
					>
						Click on a user to start Chatting.
					</Text>
				</Box>
			)}
		</>
	);
};

export default SingleChat;
