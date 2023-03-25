import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../../context/chat-provider';
import { RoomProps, RoomTypes, SocketNames } from '../../types';

const JoinRoom: React.FC<RoomProps> = ({ uuid, setUser, socket }) => {
	const { user } = ChatState();
	const navigate = useNavigate();
	const [roomId, setRoomId] = useState<string>('');
	const [name, setName] = useState<string>(user?.name);

	const handleRoomJoin = (e: any) => {
		e.preventDefault();
		const roomData: RoomTypes = {
			name,
			roomId,
			userId: uuid(),
			host: false,
			presenter: false,
		};
		setUser(roomData);
		navigate(`/games/${roomId}`);
		socket.emit<SocketNames>('userJoined', roomData);
	};

	return (
		<form
			className="form"
			onSubmit={handleRoomJoin}
		>
			<input
				className="input"
				placeholder="Enter Your Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				spellCheck={false}
			/>
			<input
				className="input mt-5"
				placeholder="Eneter Room ID"
				value={roomId}
				onChange={(e) => setRoomId(e.target.value)}
				spellCheck={false}
			/>
			<button
				className="actionBtns"
				onClick={handleRoomJoin}
			>
				Join Room
			</button>
		</form>
	);
};

export default JoinRoom;
