import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { ChatState } from '../../context/chat-provider';
import { useAppDispatch } from '../../store/hook';
import { actions } from '../../store/slices/type-race';
import {
	TypeRaceGameProps,
	TypeRaceJoinRoomPayloadProps,
	TypeRaceSockets,
} from '../../types';

type room = 'Create' | 'Join';

interface TypeRaceFormProps {
	socket: Socket;
}

const TypeRaceForm: React.FC<TypeRaceFormProps> = ({ socket }) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { user } = ChatState();
	const [gameState, setGameState] = useState<TypeRaceGameProps>({
		_id: '',
		isOpen: false,
		players: [],
		words: [],
	});
	const [form, setForm] = useState<room>('Create');
	const [nickName, setNickName] = useState<string>(user.name);
	const [gameId, setGameId] = useState<string>('');

	// Setting Game State
	useEffect(() => {
		socket.on<TypeRaceSockets>('update-game', (game: TypeRaceGameProps) => {
			console.log('TypeRace Update Game =>', game);
			setGameState(game);
		});
		return () => {
			socket.removeAllListeners();
		};
	}, []);

	// Navigating to Type-Race Page
	useEffect(() => {
		if (gameState._id !== '') {
			dispatch(actions.setGameState(gameState));
			navigate(`/type-race/${gameState._id}`);
		}
	}, [gameState._id]);

	// Handle Create Game
	const HandleCreateForm = (e: FormEvent) => {
		e.preventDefault();
		socket.emit<TypeRaceSockets>('create-game', nickName);
	};

	// Handle Join Game
	const HandleJoinForm = (e: FormEvent) => {
		e.preventDefault();
		const payload: TypeRaceJoinRoomPayloadProps = {
			nickName,
			gameId,
		};
		console.log('payload', payload);
		socket.emit<TypeRaceSockets>('join-game', payload);
	};

	return (
		<div className="formsWrapper">
			{/* Choose Room Buttons */}
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

			{/* Forms */}
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
							value={nickName}
							onChange={(e) => setNickName(e.target.value)}
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
							value={nickName}
							onChange={(e) => setNickName(e.target.value)}
							spellCheck={false}
						/>
						<input
							className="input mt-3"
							placeholder="Enter Game ID"
							value={gameId}
							onChange={(e) => setGameId(e.target.value)}
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
