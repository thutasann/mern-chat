import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import { ChatState } from '../../context/chat-provider';
import { TypeRaceSockets } from '../../types';

type room = 'Create' | 'Join';

interface TypeRaceFormProps {
	socket: Socket;
}

const TypeRaceForm: React.FC<TypeRaceFormProps> = ({ socket }) => {
	const { user } = ChatState();
	const [form, setForm] = useState<room>('Create');
	const [userName, setUserName] = useState<string>(user.name);
	const [roomId, setRoomId] = useState<string>('');

	// Handle Create Game
	const HandleCreateForm = () => {
		socket.emit<TypeRaceSockets>('create-game', userName);
	};

	const HandleJoinForm = () => {};

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
			{form === 'Create' ? (
				<div className="card">
					<h2>Create Game</h2>
					<form
						className="form"
						onSubmit={HandleCreateForm}
					>
						<input
							className="input"
							placeholder="Enter Your Name"
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
							spellCheck={false}
						/>
						<button
							onClick={HandleCreateForm}
							type="submit"
							className="mt-5 bg-slate-800 text-white w-full py-3 px-4 rounded-md transition-all duration-700 ease-in-out text-[16px] hover:bg-slate-700 font-[700]"
						>
							Create Game
						</button>
					</form>
				</div>
			) : (
				<div className="card">
					<h2>Join Game</h2>
					<form
						className="form"
						onSubmit={HandleJoinForm}
					>
						<input
							className="input"
							placeholder="Enter Your Name"
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
							spellCheck={false}
						/>
						<input
							className="input mt-3"
							placeholder="Enter Room ID"
							value={roomId}
							onChange={(e) => setRoomId(e.target.value)}
							spellCheck={false}
						/>
						<button
							onClick={HandleJoinForm}
							type="submit"
							className="mt-5 bg-slate-800 text-white w-full py-3 px-4 rounded-md transition-all duration-700 ease-in-out text-[16px] hover:bg-slate-700 font-[700]"
						>
							Join Game
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default TypeRaceForm;