import React from 'react';
import { ChatState } from '../context/chat-provider';
import SlideDrawer from '../miscellaneous/Drawer';

const NotFound = () => {
	const { user } = ChatState();

	return (
		<div>
			{user ? <SlideDrawer /> : null}
			<h1 className="text-2xl font-bold text-center mt-3">Page Not Found</h1>
		</div>
	);
};

export default NotFound;
