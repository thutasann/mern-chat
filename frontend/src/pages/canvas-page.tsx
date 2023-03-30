import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import Modal from '../components/canvas-forms/modal';
import SideBar from '../components/canvas-forms/side-bar';
import WhiteBoard from '../components/canvas-forms/whiteboard';
import { ChatState } from '../context/chat-provider';
import SlideDrawer from '../miscellaneous/Drawer';
import { RoomTypes, SocketNames } from '../types';

interface CanvasPageProps {
	user: RoomTypes;
	users: any[];
	socket: Socket;
}

const CanvasPage: React.FC<CanvasPageProps> = ({ user, users, socket }) => {
	const { user: loggedInUser } = ChatState();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		return () => {
			socket.emit<SocketNames>('userLeft', user);
		};
	}, []);

	const openModal = () => {
		setIsOpen(true);
	};

	return (
		<div>
			{loggedInUser && <SlideDrawer />}
			<div className="mainWrapper">
				<h1 className="font-semibold text-2xl uppercase">Canvas Drawing</h1>

				<Modal
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					users={users}
					user={user}
				/>
				<div className="flex flex-col md:flex-row items-center gap-0 md:gap-3 relative">
					<SideBar
						openModal={openModal}
						users={users}
					/>
					<div className="whiteboardContainer mb-7">
						<WhiteBoard />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CanvasPage;
