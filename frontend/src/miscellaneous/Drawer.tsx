import {
	Avatar,
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
import { useNavigate } from 'react-router-dom';
import { UserProps } from '../types';
import axios, { AxiosRequestConfig } from 'axios';
import ChatLoading from '../components/chat/chat-loading';
import UserList from '../components/chat/user-list';

const SlideDrawer: React.FC = () => {
	const navigate = useNavigate();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { user, setSelectedChat, chats, setChats } = ChatState();
	const [search, setSearch] = useState<string>('');
	const [searchResults, setSearchResults] = useState<UserProps[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [loadingchat, setLoadingchat] = useState<boolean>(false);

	const logoutHandler = () => {
		localStorage.removeItem('userInfo');
		navigate('/');
	};

	async function HandleSearch() {
		try {
			setLoading(true);
			const config: AxiosRequestConfig = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.get(`/api/user?search=${search}`, config);
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
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.post('/api/chat', { userId }, config);
			setSelectedChat(data);
			setLoadingchat(false);
			onClose();
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
				display={'flex'}
				justifyContent={'space-between'}
				alignItems="center"
				bg="white"
				w="100%"
				p="5px 10px 5px 10px"
				borderWidth={'5px'}
			>
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
							Search Users
						</Text>
					</Button>
				</Tooltip>

				<Text
					fontSize="2xl"
					fontWeight={'bold'}
				>
					MERN CHAT 💬
				</Text>

				<div>
					<Menu>
						<MenuButton p={1}>
							<BellIcon
								fontSize={'2xl'}
								m={1}
							/>
						</MenuButton>
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
								onChange={(e) => {
									setSearch(e.target.value);
								}}
							/>
							<Button
								onClick={HandleSearch}
								disabled={!search.length}
								backgroundColor={search.length ? 'teal.600' : 'gray.300'}
								_hover={{
									backgroundColor: '#008B8B	',
								}}
								pointerEvents={search.length === 0 ? 'none' : 'revert'}
								color={'white'}
							>
								<IoSearchOutline size={20} />
							</Button>
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
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default SlideDrawer;
