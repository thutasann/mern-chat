import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../../context/chat-provider';
import { RoomProps, RoomTypes, SocketNames } from '../../types';
import { copyToClipBoard } from '../../util';

const CreateRoom: React.FC<RoomProps> = ({ uuid, socket, setUser }) => {
	const { user } = ChatState();
	const navigate = useNavigate();
	const [name, setName] = useState<string>(user?.name);
	const [roomId, setRoomId] = useState(uuid());
	const [copied, setCopied] = useState<boolean>(false);

	const copyHandle = () => {
		copyToClipBoard(roomId);
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};

	const handleCreateRoom = (e: any) => {
		e.preventDefault();
		const roomData: RoomTypes = {
			name,
			roomId,
			userId: uuid(),
			host: true,
			presenter: true,
		};
		setUser(roomData);
		console.log('roomData', roomData);
		navigate(`/games/${roomId}`);
		socket.emit<SocketNames>('userJoined', roomData);
	};

	return (
		<div>
			<form
				className="form"
				onSubmit={handleCreateRoom}
			>
				<input
					className="input"
					placeholder="Enter Your Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					spellCheck={false}
				/>
				<div className="inputGroup">
					<input
						className="input"
						value={roomId}
						readOnly
					/>
					<button
						className="btnGenerate"
						type="button"
						onClick={(e) => {
							e.preventDefault();
							setRoomId(uuid());
						}}
					>
						Generate
					</button>
					<button
						className="btnCopy"
						type="button"
						onClick={copyHandle}
					>
						{copied ? 'copied!' : 'copy'}
					</button>
				</div>
				<button
					type="submit"
					className="mt-5 bg-slate-800 text-white w-full py-3 px-4 rounded-md transition-all duration-700 ease-in-out text-[16px] hover:bg-slate-700 font-[700]"
					onClick={handleCreateRoom}
				>
					Create Room
				</button>
			</form>
		</div>
	);
};

export default CreateRoom;
