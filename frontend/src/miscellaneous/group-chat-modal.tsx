import React, { useState } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
	useToast,
	Input,
	Spinner,
	Box,
} from '@chakra-ui/react';
import { UserProps } from '../types';
import { ChatState } from '../context/chat-provider';
import { FormControl } from '@chakra-ui/form-control';
import axios, { AxiosRequestConfig } from 'axios';
import UserList from '../components/chat/user-list';
import UserBadge from '../components/chat/user-badge';

interface GroupChatModalProps {
	children: React.ReactNode;
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({ children }) => {
	const toast = useToast();
	const { user, chats, setChats } = ChatState();
	const timer = React.useRef<NodeJS.Timeout>();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [groupChatName, setGroupChatName] = useState<string>('');
	const [selectedUsers, setSelectedUsers] = useState<UserProps[]>([]);
	const [search, setSearch] = useState<string>('');
	const [searchResult, setSearchResult] = useState<UserProps[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

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

			setLoading(false);
			setSearchResult(data);
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

	const handleGroup = (userToAdd: UserProps) => {
		if (selectedUsers.includes(userToAdd)) {
			toast({
				title: 'User already added!',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			return;
		}
		setSelectedUsers([...selectedUsers, userToAdd]);
	};

	const handleDelete = (delUser: UserProps) => {
		setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
	};

	/**
	 * Handle Submit
	 */
	const handleSubmit = async () => {
		if (!groupChatName || !selectedUsers) {
			toast({
				title: 'Please add users!',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			return;
		}

		try {
			const config: AxiosRequestConfig = {
				baseURL: 'https://api-chat-v0tz.onrender.com',
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.post(
				'/api/chat/group',
				{
					name: groupChatName,
					users: JSON.stringify(selectedUsers.map((u) => u._id)),
				},
				config,
			);

			setChats([data, ...chats]);
			onClose();
			toast({
				title: 'New Group Created!',
				status: 'success',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
		} catch (error) {
			console.error(error);
			toast({
				title: 'Failed to create Group Chat!',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
		}
	};

	return (
		<>
			<span onClick={onOpen}>{children}</span>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader
						fontSize="20px"
						display={'flex'}
						justifyContent="center"
					>
						Create Group Chat
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody
						display={'flex'}
						flexDir="column"
						alignItems={'center'}
					>
						<FormControl>
							<Input
								placeholder="Chat Name"
								mb={3}
								value={groupChatName}
								onChange={(e) => setGroupChatName(e.target.value)}
							/>
						</FormControl>
						<FormControl>
							<Input
								placeholder="Add Users eg: John, Emily, Victor"
								mb={1}
								value={search}
								onChange={handleSearch}
							/>
						</FormControl>

						<Box
							display={'flex'}
							w="100%"
							flexWrap={'wrap'}
						>
							{selectedUsers.map((u) => (
								<UserBadge
									key={u._id}
									user={u}
									handleFunction={() => handleDelete(u)}
								/>
							))}
						</Box>

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
									handleFunction={() => handleGroup(user)}
								/>
							))
						)}
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="teal"
							mr={3}
							onClick={onClose}
						>
							Close
						</Button>
						<Button
							variant="solid"
							colorScheme="telegram"
							onClick={handleSubmit}
						>
							Create Group
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default GroupChatModal;
