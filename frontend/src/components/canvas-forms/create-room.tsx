import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoomProps } from '../../types';

const CreateRoom: React.FC<RoomProps> = ({ uuid, socket, setUser }) => {
	const navigate = useNavigate();
	const [name, setName] = useState<string>('');
	const [roomId, setRoomId] = useState(uuid());

	return (
		<div>
			<form className="form">
				<input
					className="input"
					placeholder="Enter Your Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
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
					>
						Copy
					</button>
				</div>
				<button
					type="submit"
					className="mt-5 bg-slate-800 text-white w-full py-3 px-4 rounded-md transition-all duration-700 ease-in-out text-[16px] hover:bg-slate-700 font-[700]"
				>
					Create Room
				</button>
			</form>
		</div>
	);
};

export default CreateRoom;
