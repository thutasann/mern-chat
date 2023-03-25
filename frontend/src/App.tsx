import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { io } from 'socket.io-client';
import ChatPage from './pages/chat';
import GamePage from './pages/games';
import HomePage from './pages/home';
import { DataResponseTypes, RoomTypes, SocketNames } from './types';
import { PROD_ENDPOINT } from './util/constants';

const server = PROD_ENDPOINT;
const connectionOptions = {
	'force new connection': true,
	reconnectionAttempt: 'Infinity',
	timeout: 10000,
	transports: ['websocket'],
};

const socket = io(server, connectionOptions);

const App = () => {
	const [user, setUser] = useState(null);
	const [users, setUsers] = useState<RoomTypes[]>([]);

	useEffect(() => {
		// userIsJoined
		socket.on<SocketNames>('userIsJoined', (data: DataResponseTypes) => {
			console.log('data', data);
			if (data.success) {
				console.log('userJoined');
				setUsers(data.users);
			} else {
				console.log('userJoined error');
			}
		});

		// allUsers
		socket.on<SocketNames>('allUsers', (data: any[]) => {
			setUsers(data);
		});

		// userJoined Message
		socket.on<SocketNames>('userJoinedMessageBoradcasted', (data: string) => {
			console.log('message', data);
			toast.info(`${data} joined the room`);
		});

		// userLeft Message
		socket.on<SocketNames>('userLeftMessageBroadcasted', (data: string) => {
			toast.warning(`${data} left the room`);
		});
	});

	return (
		<>
			<ToastContainer />

			<Routes>
				<Route
					path="/"
					element={<HomePage />}
				/>
				<Route
					path="/chats"
					element={<ChatPage />}
				/>
				<Route
					path="/games"
					element={
						<GamePage
							socket={socket}
							setUser={setUser}
						/>
					}
				/>
			</Routes>
		</>
	);
};

export default App;
