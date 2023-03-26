import React from 'react';
import { Socket } from 'socket.io-client';
import { RoomTypes, toolType } from '../../types';

interface WhiteboardProps {
	canvasRef: any;
	ctxRef: any;
	elements: any[];
	setElements: any;
	tool: toolType;
	color: string;
	user: RoomTypes;
	socket: Socket;
}

const WhiteBoard: React.FC<WhiteboardProps> = () => {
	return <div></div>;
};

export default WhiteBoard;
