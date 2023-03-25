import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoomProps } from '../../types';

const JoinRoom: React.FC<RoomProps> = ({ uuid, setUser, socket }) => {
	const navigate = useNavigate();
	const [roomId, setRoomId] = useState<string>('');
	const [name, setName] = useState<string>('');
	return (
		<form className="form">
			<input
				className="input"
				placeholder="Enter Your Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<input
				className="input mt-5"
				placeholder="Eneter Room ID"
				value={roomId}
				onChange={(e) => setRoomId(e.target.value)}
			/>
			<button className="actionBtns">Join Room</button>
		</form>
	);
};

export default JoinRoom;
