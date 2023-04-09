import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import SideBar from '../components/canvas-forms/side-bar';
import { ChatState } from '../context/chat-provider';
import SlideDrawer from '../miscellaneous/Drawer';
import { useAppSelector } from '../store/hook';
import { findPlayer } from '../util';

interface ITypeRacePage {
	socket: Socket;
}

const TypeRacePage: React.FC<ITypeRacePage> = ({ socket }) => {
	const { user } = ChatState();
	const navigate = useNavigate();
	const params = useParams<{ gameId?: string }>();
	const {
		typeRaceGame: { _id, players },
	} = useAppSelector((store) => store.typeRacer);
	const player = findPlayer(players, socket);

	useEffect(() => {
		if (_id === '') {
			navigate('/games');
		}
	}, [_id]);

	return <div>{user ? <SlideDrawer /> : null}</div>;
};

export default TypeRacePage;
