import React from 'react';
import { PlayerProps } from '../../types';

interface IDisplayWords {
	words: string[];
	player: PlayerProps;
}

function getTypedWords(words: any, player: PlayerProps): React.ReactNode {
	let typedWords = words.slice(0, player.currentWordIndex!);
	typedWords = typedWords.join(' ');
	return <span className="bg-[#008080]">{typedWords}</span>;
}

function getCurrentWord(words: any, player: PlayerProps): React.ReactNode {
	return (
		<span className="underline mr-1">{words[player.currentWordIndex!]}</span>
	);
}

function getWordsToBeTyped(words: any, player: PlayerProps): React.ReactNode {
	let wordsToBeTyped = words.slice(player.currentWordIndex! + 1, words.length);
	wordsToBeTyped = wordsToBeTyped.join(' ');
	return <span>{wordsToBeTyped}</span>;
}

const DisplayWords: React.FC<IDisplayWords> = ({ words, player }) => {
	return (
		<div className="my-7 max-w-[350px] md:max-w-[750px] text-center">
			{getTypedWords(words, player)}
			{getCurrentWord(words, player)}
			{getWordsToBeTyped(words, player)}
		</div>
	);
};

export default DisplayWords;
