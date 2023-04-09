import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { TimerProps, TypeRaceSockets } from '../../types';

interface ICounter {
	socket: Socket;
}

const Counter: React.FC<ICounter> = ({ socket }) => {
	const [timer, setTimer] = useState<TimerProps>({
		countDown: '',
		msg: '',
	});
	const { countDown, msg } = timer;

	useEffect(() => {
		socket.on<TypeRaceSockets>('timer', (data: TimerProps) => {
			setTimer(data);
		});
		socket.on<TypeRaceSockets>('done', () => {
			socket.removeListener<TypeRaceSockets>('timer');
		});
	}, []);

	return (
		<div>
			<>
				<h1>{countDown}</h1>
				<h3>{msg}</h3>
			</>
		</div>
	);
};

export default Counter;
