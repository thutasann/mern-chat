import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { ChatState } from '../../context/chat-provider';
import { ChatBoxProps } from './chat-box';
import { MdOutlineGroups2 } from 'react-icons/md';
import { getFullSender, getSender } from '../../config/chat-logic';
import ProfileModal from '../../miscellaneous/profile-modal';
import UpdateGroupChat from './update-group-chat';

const SingleChat: React.FC<ChatBoxProps> = ({ fetchAgain, setFetchAgain }) => {
	const { user, selectedChat, setSelectedChat } = ChatState();

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
						{/* Messages Here */}
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
