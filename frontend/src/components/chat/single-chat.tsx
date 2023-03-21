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

var socket: Socket;
var selectedChatCompare: ChatProps;

const SingleChat: React.FC<ChatBoxProps> = ({ fetchAgain, setFetchAgain }) => {
	const { user, selectedChat, setSelectedChat } = ChatState();
	const toast = useToast();
	const [messages, setMessages] = useState<MessageProps[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [newMessage, setNewMessage] = useState<string>('');
	const [socketConnected, setSocketConnected] = useState<boolean>(false);

	// socket
	useEffect(() => {
		socket = io(PROD_ENDPOINT);
		socket.emit<SocketNames>('setup', user);
		socket.on<SocketNames>('connection', () => setSocketConnected(true));
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
					// give notification
				} else {
					setMessages([...messages, newMessageReceived]);
				}
			},
		);
	});

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

	const sendMessage = async (e: KeyboardEvent | any) => {
		if (e.key === 'Enter' && newMessage) {
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

	const typingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value;
		setNewMessage(value);
	};

	return (
		<>
			{selectedChat ? (
				<>
					{/* @ts-ignore */}
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
