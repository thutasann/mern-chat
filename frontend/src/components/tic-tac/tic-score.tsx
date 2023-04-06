import React from 'react';

interface ITicScore {
	myScore: number;
	oponentName: string;
	oponentScore: number;
}

const TicScore: React.FC<ITicScore> = ({
	myScore,
	oponentName,
	oponentScore,
}) => {
	console.log('oponentName', oponentName);
	return (
		<div className="flex items-center gap-5 mt-4">
			<div className="score bg-gradient-to-tr from-teal-400 to-teal-600">
				<p>You</p> <h3>{myScore}</h3>
			</div>
			<div className="score bg-gradient-to-r from-rose-400 to-red-500">
				<p>{oponentName || 'Oponent'} </p> <h3>{oponentScore}</h3>
			</div>
		</div>
	);
};

export default TicScore;
