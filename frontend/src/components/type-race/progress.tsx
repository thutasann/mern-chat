import { Progress } from '@chakra-ui/react';
import React from 'react';
import { PlayerProps } from '../../types';
import { Alert, AlertIcon, AlertTitle, useToast } from '@chakra-ui/react';

interface IProgress {
	players: PlayerProps[];
	player: PlayerProps;
	wordsLength: number;
}

function calPercentage(player: PlayerProps, wordsLength: number): number {
	if (player.currentWordIndex !== 0) {
		return Number(((player.currentWordIndex! / wordsLength) * 100).toFixed(2));
	}
	return 0;
}

const CustomProgress: React.FC<IProgress> = ({
	players,
	player,
	wordsLength,
}) => {
	const percentage = calPercentage(player, wordsLength);
	console.log('players', players);

	return (
		<div className="w-[350px] md:w-[750px] mt-[50px] border-t pt-4">
			<h2 className="text-center mb-7 text-2xl font-[600]">Progresses</h2>
			<div className="flex items-center justify-between font-[500]">
				<h5>{player.nickName}</h5>
				<span>{percentage} %</span>
			</div>
			<Progress
				value={percentage}
				rounded="md"
				colorScheme="teal"
			/>

			{/* Oponents */}
			<div className="mt-7">
				<h2 className="text-center mb-3 text-2xl font-[600]">Oponents</h2>
				{players?.map((playerObj) => {
					const percentage = calPercentage(playerObj, wordsLength);
					return playerObj._id !== player._id ? (
						<div key={playerObj._id}>
							<div className="flex items-center justify-between font-[500]">
								<h5>{playerObj.nickName}</h5>
								<span>{percentage} %</span>
							</div>
							<Progress
								value={percentage}
								rounded="md"
								colorScheme="teal"
							/>
						</div>
					) : null;
				})}
			</div>
		</div>
	);
};

export default CustomProgress;
