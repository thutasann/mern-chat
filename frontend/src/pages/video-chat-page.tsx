import React from 'react';
import { ChatState } from '../context/chat-provider';
import SlideDrawer from '../miscellaneous/Drawer';

const VideoChatPage = () => {
	const { user: loggedInUser } = ChatState();

	return <>{loggedInUser && <SlideDrawer />}</>;
};

export default VideoChatPage;
