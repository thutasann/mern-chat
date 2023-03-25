import React, { useState } from 'react';
import { RoomProps } from '../../types';
import CreateRoom from './create-room';
import JoinRoom from './join-room';

type room = 'Create' | 'Join';

const Forms: React.FC<RoomProps> = ({ uuid, socket, setUser }) => {
	const [form, setForm] = useState<room>('Create');

	return (
		<div className="formsWrapper">
			<div className="flex my-2 items-center gap-2">
				<button
					className={`chooseRoom ${
						form === 'Create' ? 'bg-slate-800' : 'bg-transparent text-slate-800'
					}`}
					onClick={() => setForm('Create')}
				>
					Create
				</button>
				<button
					className={`chooseRoom ${
						form === 'Join' ? 'bg-slate-800' : 'bg-transparent text-slate-800'
					}`}
					onClick={() => setForm('Join')}
				>
					Join
				</button>
			</div>
			<div className="cardWrapper">
				{form === 'Create' ? (
					<div className="card">
						<h2>Create Room</h2>
						<CreateRoom
							uuid={uuid}
							socket={socket}
							setUser={setUser}
						/>
					</div>
				) : (
					<div className="card">
						<h2>Join Room</h2>
						<JoinRoom
							uuid={uuid}
							socket={socket}
							setUser={setUser}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default Forms;
