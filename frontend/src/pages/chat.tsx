import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import ChatBox from '../components/chat/chat-box';
import MyChats from '../components/chat/my-chats';
import { ChatState } from '../context/chat-provider';
import SlideDrawer from '../miscellaneous/Drawer';

const ChatPage: React.FC = () => {
	const { user } = ChatState();
	const [fetchAgain, setFetchAgain] = useState<boolean>(false);

	return (
		<div className="w-full chat-bg">
			{user && <SlideDrawer />}
			<Box
				display="flex"
				justifyContent="space-between"
				w="100%"
				h="91.5vh"
				p="10px"
			>
				{user && <MyChats fetchAgain={fetchAgain} />}
				{user && (
					<ChatBox
						fetchAgain={fetchAgain}
						setFetchAgain={setFetchAgain}
					/>
				)}
			</Box>
		</div>
	);
};

export default ChatPage;
