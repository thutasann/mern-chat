import React from 'react';
import {
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
} from '@chakra-ui/react';

import { PlayerProps } from '../../types';

interface IScoreBoard {
	players: PlayerProps[];
}

function getScoreBoard(players: PlayerProps[]): PlayerProps[] {
	const scoreboard = players.filter((player) => player.WPM !== -1);
	return scoreboard.sort((a, b) =>
		a.WPM > b.WPM ? -1 : b.WPM > a.WPM ? 1 : 0,
	);
}

const ScoreBoard: React.FC<IScoreBoard> = ({ players }) => {
	const scoreBoard = getScoreBoard(players);

	if (scoreBoard.length === 0) {
		return null;
	}

	return (
		<div className="my-[50px] w-[90%]">
			<h2 className="text-center mb-3 text-2xl font-[600]">Scoreboard</h2>
			<div>
				<TableContainer
					border="1px solid lightGray"
					rounded="md"
					p={5}
				>
					<Table variant="striped">
						<Thead>
							<Tr>
								<Th>Player</Th>
								<Th>Words Per Minutes (WPM)</Th>
							</Tr>
						</Thead>
						<Tbody>
							{scoreBoard?.map((player) => (
								<Tr key={player._id}>
									<Td>{player.nickName}</Td>
									<Td>{player.WPM}</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</div>
		</div>
	);
};

export default ScoreBoard;
