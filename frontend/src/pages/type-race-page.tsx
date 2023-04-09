import React from 'react';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import SideBar from '../components/canvas-forms/side-bar';
import { ChatState } from '../context/chat-provider';
import SlideDrawer from '../miscellaneous/Drawer';
import { useAppSelector } from '../store/hook';

interface ITypeRacePage {
	socket: Socket;
}

const TypeRacePage: React.FC<ITypeRacePage> = () => {
	const { user } = ChatState();
	const state = useAppSelector((store) => store.typeRacer);
	console.log('state', state.typeRaceGame);
	const params = useParams<{ gameId?: string }>();

	return <div>{user ? <SlideDrawer /> : null}</div>;
};

export default TypeRacePage;
