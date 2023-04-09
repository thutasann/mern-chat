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
	console.log('timer', timer);

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
			className={`w-[300px] text-center text-slate-700 ${
				msg && countDown ? 'block' : 'hidden'
			} rounded-md py-5 px-7 bg-gray-200 shadow-sm `}
		>
			<div className="flex items-center justify-center gap-2">
				{msg === 'Starting Game in...' ? <Spinner /> : null}
				<h3 className="text-lg font-[400]">{msg}</h3>
			</div>
			<h1 className="text-6xl font-[700] mt-2">{countDown}</h1>
		</div>
	);
};

export default Counter;
