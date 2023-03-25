import React from 'react';
import { Socket } from 'socket.io-client';

interface CanvasPageProps {
	user: any;
	users: any[];
	socket: Socket;
}

const CanvasPage: React.FC<CanvasPageProps> = ({ user, users, socket }) => {
	return <div>CanvasPage</div>;
};

export default CanvasPage;
