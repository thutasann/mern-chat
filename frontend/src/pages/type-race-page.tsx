import { useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import Counter from '../components/type-race/counter';
import DisplayWords from '../components/type-race/display-words';
import CustomProgress from '../components/type-race/progress';
import ScoreBoard from '../components/type-race/score-board';
import StartBtn from '../components/type-race/start-btn';
import TypeRaceHeader from '../components/type-race/type-race-header';
import TypeRaceInput from '../components/type-race/type-race-input';
import { ChatState } from '../context/chat-provider';
import SlideDrawer from '../miscellaneous/Drawer';
import { useAppSelector } from '../store/hook';
import { copyToClipBoard, findPlayer } from '../util';

export interface ITypeRacePage {
	socket: Socket;
}

const TypeRacePage: React.FC<ITypeRacePage> = ({ socket }) => {
	const { user } = ChatState();
	const toast = useToast();
	const navigate = useNavigate();
	const params = useParams<{ gameId?: string }>();
	const {
		typeRaceGame: { _id, players, words, isOpen, isOver },
	} = useAppSelector((store) => store.typeRacer);
	const player = findPlayer(players, socket);

	const HanldeCopy = () => {
		copyToClipBoard(params.gameId!);
		toast({
			title: 'Copied to clipboard!',
			status: 'info',
			duration: 5000,
			isClosable: true,
			position: 'bottom',
		});
	};

	useEffect(() => {
		if (_id === '' || player === undefined) {
			navigate('/games');
		}
	}, [_id, player]);

	return (
		<div>
			{user ? <SlideDrawer /> : null}
			<div className="mainWrapper">
				<TypeRaceHeader
					gameId={params.gameId!}
					onClick={HanldeCopy}
				/>

				<Counter socket={socket} />

				{player ? (
					<>
						<DisplayWords
							words={words}
							player={player}
						/>
						<StartBtn
							player={player}
							gameId={_id}
							socket={socket}
						/>
					</>
				) : null}

				<TypeRaceInput
					isOpen={isOpen}
					isOver={isOver}
					gameId={_id}
					socket={socket}
				/>
				{player ? (
					<CustomProgress
						players={players}
						player={player}
						wordsLength={words.length}
					/>
				) : null}

				{players ? <ScoreBoard players={players} /> : null}
			</div>
		</div>
	);
};

export default TypeRacePage;
