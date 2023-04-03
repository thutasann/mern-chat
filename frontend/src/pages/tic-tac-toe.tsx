import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { ChatState } from '../context/chat-provider';
import SlideDrawer from '../miscellaneous/Drawer';
import { useAppSelector } from '../store/hook';
import { TicTacSockets } from '../types';

interface TicTacToePageProps {
	socket: Socket;
}

const loadingText: string = 'waiting for another player...';

const TicTacToePage: React.FC<TicTacToePageProps> = ({ socket }) => {
	const { user: loggedInUser } = ChatState();
	const { user } = useAppSelector((state) => state.ticUser);
	const params = useParams();
	const [roomId, setRoomId] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [loadingValue, setLoadingValue] = useState<string>(loadingText);
	const [userJoined, setUserJoined] = useState<boolean>(false);
	const [userTurn, setUserTurn] = useState<boolean>(false);
	const [oponentName, setOponentName] = useState<string>('');
	const [move, setMove] = useState<any>();

	useEffect(() => {
		window.onbeforeunload = function () {
			window.setTimeout(function () {
				window.location.href = '/';
				socket.emit<TicTacSockets>('removeRoom');
			}, 0);
			window.onbeforeunload = null;
		};

		window.history.pushState(null, document.title, window.location.href);
		window.addEventListener('popstate', function () {
			window.history.pushState(null, document.title, this.window.location.href);
		});
	});

	return <div>{loggedInUser && <SlideDrawer />}</div>;
};

export default TicTacToePage;
