import React from 'react';
import { Socket } from 'socket.io-client';
import SideBar from '../components/canvas-forms/side-bar';
import { ChatState } from '../context/chat-provider';
import SlideDrawer from '../miscellaneous/Drawer';

interface ITypeRacePage {
	socket: Socket;
}

const TypeRacePage: React.FC<ITypeRacePage> = () => {
	const { user } = ChatState();

	return <div>{user ? <SlideDrawer /> : null}</div>;
};

export default TypeRacePage;
