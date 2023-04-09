import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import Counter from '../components/type-race/counter';
import StartBtn from '../components/type-race/start-btn';
import { ChatState } from '../context/chat-provider';
import SlideDrawer from '../miscellaneous/Drawer';
import { useAppSelector } from '../store/hook';
import { findPlayer } from '../util';

export interface ITypeRacePage {
	socket: Socket;
}

const TypeRacePage: React.FC<ITypeRacePage> = ({ socket }) => {
	const { user } = ChatState();
	const navigate = useNavigate();
	const params = useParams<{ gameId?: string }>();
	const {
		typeRaceGame: { _id, players },
	} = useAppSelector((store) => store.typeRacer);
	const player = findPlayer(players, socket);
	console.log('player', player);

	useEffect(() => {
		if (_id === '' || player === undefined) {
			navigate('/games');
		}
	}, [_id, player]);

	return (
		<div>
			{user ? <SlideDrawer /> : null}
			<div className="flex flex-col items-center justify-center">
				{player ? (
					<StartBtn
						player={player}
						gameId={_id}
						socket={socket}
					/>
				) : null}
				<Counter socket={socket} />
			</div>
		</div>
	);
};

export default TypeRacePage;
