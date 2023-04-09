import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import Spinner from '../../miscellaneous/spinner';
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
		socket.on<TypeRaceSockets>('timer', (data) => {
			setTimer(data);
		});
		socket.on<TypeRaceSockets>('done', () => {
			socket.removeListener<TypeRaceSockets>('timer');
		});
	}, [socket]);

	return (
		<div
			className={`w-[300px] text-center text-white ${
				msg && countDown ? 'block py-5' : 'hidden py-0'
			} rounded-md px-7 bg-gradient-to-tr from-teal-400 to-teal-600 shadow-sm `}
		>
			<div className="flex items-center justify-center gap-2">
				{msg === 'Starting Game in...' ? <Spinner /> : null}
				<h3 className="text-lg font-[500]">{msg}</h3>
			</div>
			<h1 className="text-6xl font-[700] mt-2">{countDown}</h1>
		</div>
	);
};

export default Counter;
