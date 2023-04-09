import {
	Avatar,
	Badge,
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Input,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Spinner,
	Text,
	Tooltip,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { ChatState } from '../context/chat-provider';
import ProfileModal from './profile-modal';
import { Link, useNavigate } from 'react-router-dom';
import { UserProps } from '../types';
import axios, { AxiosRequestConfig } from 'axios';
import ChatLoading from '../components/chat/chat-loading';
import UserList from '../components/chat/user-list';
import { getSender } from '../config/chat-logic';
import { IoGameControllerOutline } from 'react-icons/io5';

const SlideDrawer: React.FC = () => {
	const navigate = useNavigate();
	const timer = React.useRef<NodeJS.Timeout>();
	const toast = useToast();
	const {
		user,
		setSelectedChat,
		chats,
		setChats,
		notification,
		setNotification,
	} = ChatState();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [search, setSearch] = useState<string>('');
	const [searchResults, setSearchResults] = useState<UserProps[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [loadingchat, setLoadingchat] = useState<boolean>(false);

	const logoutHandler = () => {
		localStorage.removeItem('userInfo');
		navigate('/');
	};

	async function HandleSearch(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.currentTarget.value;
		clearTimeout(timer.current);

		setSearch(value);

		try {
			setLoading(true);
			const config: AxiosRequestConfig = {
				baseURL: 'https://api-chat-v0tz.onrender.com',
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.get(`/api/user?search=${value}`, config);
			setLoading(false);
			setSearchResults(data);
		} catch (error: any) {
			console.error(error.message);
			toast({
				title: 'Error Occured!',
				description: 'Failed to load Search Results',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom-left',
			});
		}
	}

	async function accessChat(userId: string) {
		try {
			setLoadingchat(true);
			const config: AxiosRequestConfig = {
				baseURL: 'https://api-chat-v0tz.onrender.com',
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.post('/api/chat', { userId }, config);

			if (!chats.find((c) => c._id === data._id)) {
				setChats([data, ...chats]);
			}
			setSelectedChat(data);
			setLoadingchat(false);
			onClose();
			navigate('/chats');
		} catch (error: any) {
			toast({
				title: 'Error Fetching the chat!',
				description: error.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom-left',
			});
		}
	}

	return (
		<>
			<Box
				position={'sticky'}
				zIndex={9}
				top={0}
				display={'flex'}
				justifyContent={'space-between'}
				alignItems="center"
				bg="white"
				w="100%"
				p="12px"
			>
				<div className="flex items-center gap-3">
					<div>
						<Link to="/chats">
							<img
								src="/logo.png"
								width={50}
								height={50}
								alt="mern chat"
							/>
						</Link>
					</div>

					<div>
						<Tooltip
							label="Search Users to chat"
							hasArrow
							placement="bottom-end"
						>
							<Button
								variant="solid"
								backgroundColor={'gray.200'}
								onClick={onOpen}
							>
								<IoSearchOutline size={20} />
								<Text
									px="4"
									display={{
										base: 'none',
										md: 'flex',
									}}
									fontWeight={500}
								>
									Search
								</Text>
							</Button>
						</Tooltip>

						<Link to="/games">
							<Button
								ml={2}
								variant="solid"
								colorScheme={'teal'}
								gap={2}
							>
								<IoGameControllerOutline size={20} />
								<Text
									display={{
										base: 'none',
										md: 'flex',
									}}
								>
									Games
								</Text>
							</Button>
						</Link>
					</div>
				</div>

				<div>
					<Menu>
						<MenuButton p={1}>
							<Badge
								colorScheme="red"
								width={6}
							>
								{notification.length}
							</Badge>
							<BellIcon
								fontSize={'3xl'}
								m={1}
								color="gray"
							/>
						</MenuButton>
						<MenuList pl={2}>
							{!notification.length && 'No New Messages'}
							{notification?.map((noti) => (
								<MenuItem
									key={noti._id}
									onClick={() => {
										setSelectedChat(noti.chat);
										setNotification(notification.filter((n) => n !== noti));
									}}
								>
									{noti.chat.isGroupChat
										? `New Message in ${noti.chat.chatName}`
										: `New Message From ${getSender(user, noti.chat.users)}`}
								</MenuItem>
							))}
						</MenuList>
					</Menu>
					<Menu>
						<MenuButton
							as={Button}
							rightIcon={<ChevronDownIcon />}
						>
							<Avatar
								size="sm"
								cursor={'pointer'}
								name={user.name}
								src={user.pic}
							/>
						</MenuButton>
						<MenuList>
							<ProfileModal user={user}>
								<MenuItem>My Profile</MenuItem>
							</ProfileModal>
							<MenuItem onClick={logoutHandler}>Logout</MenuItem>
						</MenuList>
					</Menu>
				</div>
			</Box>

			{/* Drawer */}
			<Drawer
				placement="left"
				onClose={onClose}
				isOpen={isOpen}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
					<DrawerBody>
						<Box
							display={'flex'}
							pb={2}
						>
							<Input
								placeholder="Search by name or email"
								mr={2}
								value={search}
								onChange={HandleSearch}
							/>
						</Box>
						{loading ? (
							<ChatLoading />
						) : (
							searchResults?.map((user, idx) => {
								return (
									<UserList
										user={user}
										key={idx}
										handleFunction={() => accessChat(user._id)}
									/>
								);
							})
						)}
						{loadingchat && (
							<Spinner
								ml="auto"
								display="flex"
							/>
						)}
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default SlideDrawer;
