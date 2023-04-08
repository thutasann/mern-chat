import React from 'react';
import { Socket } from 'socket.io-client';

interface ITypeRacePage {
	socket: Socket;
}

const TypeRacePage: React.FC<ITypeRacePage> = () => {
	return <div>TypeRacePage</div>;
};

export default TypeRacePage;
