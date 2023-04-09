import { PlayerProps } from '../types/canvas';

export function calculateTime(time: number): string {
	let minutes = Math.floor(time / 60);
	let seconds = time % 60;
	return `${minutes} : ${seconds < 10 ? '0' + seconds : seconds}`;
}

export function calculateWPM(
	endTime: number,
	startTime: number,
	player: PlayerProps,
): number {
	let numOfWords = player.currentWordIndex!;
	const timeInSeconds = (endTime - startTime) / 1000;
	const timeInMinutes = timeInSeconds / 60;
	const WPM = Math.floor(numOfWords / timeInMinutes);
	return WPM;
}
