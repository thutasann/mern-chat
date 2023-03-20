import { Box, Stack, Text, useToast } from '@chakra-ui/react';
import axios, { AxiosRequestConfig } from 'axios';
import { FC, useEffect, useState } from 'react';
import { ChatState } from '../../context/chat-provider';
import { UserProps } from '../../types';
import { Button } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './chat-loading';
import { getSender } from '../../config/chat-logic';
import GroupChatModal from '../../miscellaneous/group-chat-modal';

interface MyChatsProps {
	fetchAgain: boolean;
}

const MyChats: FC<MyChatsProps> = ({ fetchAgain }) => {
	const toast = useToast();
	const [loggedUser, setLoggedUser] = useState<UserProps>();
	const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
	const [loading, setLoading] = useState<boolean>(false);

	async function fetchChats() {
		try {
			const config: AxiosRequestConfig = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			setLoading(true);
			const { data } = await axios.get('/api/chat', config);
			setChats(data);
			setLoading(false);
		} catch (error) {
			toast({
				title: 'Error Occured!',
				description: 'Failed to Load the chats',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom-left',
			});
		}
	}

	useEffect(() => {
		setLoggedUser(JSON.parse(localStorage.getItem('userInfo')!));
		fetchChats();
	}, [fetchAgain]);

	return (
		<Box
			display={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
			flexDir="column"
			alignItems="center"
			p={3}
			background="white"
			w={{ base: '100%', md: '31%' }}
			borderRadius="lg"
			borderWidth="1px/"
		>
			<Box
				pb={3}
				px={3}
				fontSize={{ base: '28px', md: '30px' }}
				display="flex"
				w="100%"
				justifyContent={'space-between'}
				alignItems="center"
			>
				<Text
					fontWeight={600}
					fontSize="20px"
				>
					Chats
				</Text>
				<GroupChatModal>
					<Button
						display={'flex'}
						fontSize={{
							base: '17px',
							md: '12px',
							lg: '17px',
						}}
						rightIcon={<AddIcon />}
					>
						New Group Chat
					</Button>
				</GroupChatModal>
			</Box>
			<Box
				display={'flex'}
				flexDir="column"
				p={3}
				bg="#F8F8F8"
				w="100%"
				h="100%"
				borderRadius={'lg'}
				overflowY="hidden"
				border={'1px solid lightGray'}
			>
				{chats && !loading ? (
					<Stack overflowY={'scroll'}>
						{chats?.map((chat, idx) => (
							<Box
								key={idx}
								onClick={() => setSelectedChat(chat)}
								cursor="pointer"
								bg={selectedChat === chat ? '#38B2AC' : '#E8E8E8'}
								color={selectedChat === chat ? 'white' : 'black'}
								px={3}
								py={2}
								borderRadius="lg"
							>
								<Text>
									{!chat.isGroupChat
										? getSender(loggedUser, chat.users)
										: chat.chatName}
								</Text>
							</Box>
						))}
					</Stack>
				) : (
					<>{loading && <ChatLoading />}</>
				)}
			</Box>
		</Box>
	);
};

export default MyChats;
