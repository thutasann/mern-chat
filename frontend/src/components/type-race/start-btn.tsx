import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ITypeRacePage } from '../../pages/type-race-page';
import { PlayerProps, TypeRaceSockets } from '../../types';

interface IStartBtn extends ITypeRacePage {
	player: PlayerProps;
	gameId: string;
	disabled?: boolean;
}

const StartBtn = ({ player, gameId, socket, disabled }: IStartBtn) => {
	const [showBtn, setShowBtn] = useState<boolean>(true);
	const { isPartyLeader, _id } = player;

	const HandleClick = () => {
		if (disabled) return;
		socket.emit<TypeRaceSockets>('timer', {
			playerId: _id,
			gameId,
		});
		setShowBtn(false);
	};

	return isPartyLeader && showBtn ? (
		<Button
			disabled={disabled}
			variant="solid"
			cursor={disabled ? 'not-allowed' : 'pointer'}
			background={disabled ? 'gray.300' : 'teal.600'}
			_hover={{
				backgroundColor: disabled ? '#CBD5E0' : '#0C9494',
			}}
			color="white"
			ml={1}
			fontSize={16}
			onClick={HandleClick}
		>
			Start Game
		</Button>
	) : null;
};

export default StartBtn;
