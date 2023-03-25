import React from 'react';
import { RoomProps } from '../../types';
import CreateRoom from './create-room';
import JoinRoom from './join-room';

const Forms: React.FC<RoomProps> = ({ uuid, socket, setUser }) => {
	return (
		<div className="formsWrapper">
			<div className="cardWrapper">
				<div className="card">
					<h2>Create Room</h2>
					<CreateRoom uuid={uuid} />
				</div>
				<div className="card">
					<h2>Join Room</h2>
					<JoinRoom uuid={uuid} />
				</div>
			</div>
		</div>
	);
};

export default Forms;
