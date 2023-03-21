import {
	Box,
	Button,
	Input,
	Spinner,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { FormControl } from '@chakra-ui/form-control';
import React, { useState } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from '@chakra-ui/react';
import { MdOutlineGroups2 } from 'react-icons/md';
import { ChatState } from '../../context/chat-provider';
import UserBadge from './user-badge';
import { MessageProps, UserProps } from '../../types';
import axios, { AxiosRequestConfig } from 'axios';
import UserList from './user-list';

export interface ChatBoxProps {
	fetchAgain: boolean;
	setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
	fetchMessages: () => void;
}

const UpdateGroupChat: React.FC<ChatBoxProps> = ({
	fetchAgain,
	setFetchAgain,
	fetchMessages,
}) => {
	const timer = React.useRef<NodeJS.Timeout>();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { selectedChat, setSelectedChat, user } = ChatState();
	const [groupChatName, setGroupChatName] = useState<string>(
		selectedChat.chatName,
	);
	const [search, setSearch] = useState<string>('');
	const [searchResult, setSearchResults] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [renameLoading, setRenameLoading] = useState<boolean>(false);

	const handleReName = async () => {
		if (!groupChatName) return;
		try {
			setRenameLoading(true);

			const config: AxiosRequestConfig = {
				baseURL: 'https://api-chat-v0tz.onrender.com',
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.put(
				'api/chat/rename',
				{
					chatId: selectedChat._id,
					chatName: groupChatName,
				},
				config,
			);
			setSelectedChat(data);
			setFetchAgain(!fetchAgain);
			fetchMessages();
			setRenameLoading(false);
		} catch (error) {
			console.error(error);
			toast({
				title: 'Failed to rename Group Chat!',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			setRenameLoading(false);
			setGroupChatName('');
		}
	};

	const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value;
		clearTimeout(timer.current);

		setSearch(value);

		if (!value) {
			return;
		}

		try {
			setLoading(true);
			const config: AxiosRequestConfig = {
				baseURL: 'https://api-chat-v0tz.onrender.com',
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};

			const { data } = await axios.get(`/api/user?search=${value}`, config);
			setSearchResults(data);
			setLoading(false);
		} catch (error: any) {
			console.error(error);
			toast({
				title: 'Something went wrong',
				description: error.response.data.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
		}
	};

	const handleAddUser = async (userToAdd: UserProps) => {
		if (selectedChat.users.find((u) => u._id === userToAdd._id)) {
			toast({
				title: 'User already in the group!',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			return;
		}

		try {
			setLoading(true);
			const config: AxiosRequestConfig = {
				baseURL: 'https://api-chat-v0tz.onrender.com',
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.put(
				'/api/chat/groupadd',
				{
					chatId: selectedChat._id,
					userId: userToAdd._id,
				},
				config,
			);

			setSelectedChat(data);
			setFetchAgain(!fetchAgain);
			setLoading(false);
			setSearch('');
			setSearchResults([]);
		} catch (error) {
			console.error(error);
			toast({
				title: 'Something went wrong!',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			setLoading(false);
		}
	};

	const handleRemove = async (userToRemove: UserProps) => {
		try {
			setLoading(true);
			const config: AxiosRequestConfig = {
				baseURL: 'https://api-chat-v0tz.onrender.com',
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.put(
				`api/chat/groupremove`,
				{
					chatId: selectedChat._id,
					userId: userToRemove._id,
				},
				config,
			);
			userToRemove._id === user._id
				? setSelectedChat(null)
				: setSelectedChat(data);
			setFetchAgain(!fetchAgain);
			setLoading(false);
		} catch (error) {
			console.error(error);
			toast({
				title: 'Something went wrong!',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			setLoading(false);
		}
	};

	return (
		<>
			<MdOutlineGroups2
				size={40}
				style={{
					color: 'gray',
				}}
				onClick={onOpen}
				cursor="pointer"
			/>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				isCentered
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{selectedChat.chatName}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Box
							w="100%"
							display={'flex'}
							flexWrap="wrap"
							pb={3}
						>
							{selectedChat.users.map((u) => (
								<UserBadge
									key={u._id}
									user={u}
									handleFunction={() => handleRemove(u)}
								/>
							))}
						</Box>
						<FormControl display={'flex'}>
							<Input
								placeholder="Chat Name"
								mb={3}
								value={groupChatName}
								onChange={(e) => setGroupChatName(e.target.value)}
							/>
							<Button
								variant="solid"
								background={'teal'}
								color="white"
								colorScheme={'teal'}
								isLoading={renameLoading}
								onClick={handleReName}
								ml={1}
							>
								Rename
							</Button>
						</FormControl>
						<FormControl>
							<Input
								placeholder="Add User to Group"
								mb={1}
								value={search}
								onChange={handleSearch}
							/>
						</FormControl>
						{loading ? (
							<Spinner
								ml="auto"
								display="flex"
							/>
						) : (
							searchResult?.slice(0, 4).map((user) => (
								<UserList
									key={user._id}
									user={user}
									handleFunction={() => handleAddUser(user)}
								/>
							))
						)}
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="red"
							onClick={() => handleRemove(user)}
						>
							Leave Group
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default UpdateGroupChat;
