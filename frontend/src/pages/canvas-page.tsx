import React, { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import Modal from '../components/canvas-forms/modal';
import WhiteBoard from '../components/canvas-forms/whiteboard';
import { ChatState } from '../context/chat-provider';
import SlideDrawer from '../miscellaneous/Drawer';
import { RoomTypes, SocketNames, toolType } from '../types';

interface CanvasPageProps {
	user: RoomTypes;
	users: any[];
	socket: Socket;
}

const CanvasPage: React.FC<CanvasPageProps> = ({ user, users, socket }) => {
	const { user: loggedInUser } = ChatState();
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const ctxRef = useRef<any>(null);
	const [tool, setTool] = useState<toolType>('pencil');
	const [color, setColor] = useState<string>('black');
	const [elements, setElements] = useState<any[]>([]);
	const [history, setHistory] = useState<any[]>([]);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		socket.emit<SocketNames>('userLeft', user);
	}, []);

	const openModal = () => {
		setIsOpen(true);
	};

	const undo = () => {};

	const redo = () => {};

	const clear = () => {};

	return (
		<div>
			{loggedInUser && <SlideDrawer />}
			<div className="mainWrapper">
				<h1 className="font-semibold text-2xl uppercase">Canvas Drawing</h1>
				<button
					className="joinersBtn mt-3"
					onClick={openModal}
				>
					Joiners : {users?.length || 0}
				</button>
				<Modal
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					users={users}
					user={user}
				/>
				{user?.presenter && (
					<div className="toolBtnsContainer mt-5">
						{/* color picker */}
						<div className="flex items-center gap-2">
							<label htmlFor="color">Select Color: </label>
							<input
								type="color"
								id="color"
								className="colorPicketInput"
								value={color}
								onChange={(e) => setColor(e.target.value)}
							/>
						</div>

						{/* tools */}
						<div className="tools">
							<div>
								<label htmlFor="pencil">Pencil</label>
								<input
									type="radio"
									name="tool"
									checked={tool === 'pencil'}
									className="radio"
									value="pencil"
									id="pencil"
									onChange={(e) => setTool(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor="line">Line</label>
								<input
									type="radio"
									name="tool"
									checked={tool === 'line'}
									className="radio"
									value="line"
									id="line"
									onChange={(e) => setTool(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor="rectangle">Rectangle</label>
								<input
									type="radio"
									name="tool"
									checked={tool === 'rectangle'}
									className="radio"
									value="rectangle"
									onChange={(e) => setTool(e.target.value)}
								/>
							</div>
						</div>

						{/* Rewind Btn Wrapper */}
						<div className="rewindBtnWrapper">
							<button
								className="rewindBtns bg-[#007bff] text-white hover:bg-opacity-90"
								disabled={elements.length === 0}
								onClick={() => undo()}
							>
								Undo
							</button>
							<button
								className="rewindBtns"
								disabled={history.length < 1}
								onClick={() => redo()}
							>
								Redo
							</button>
						</div>

						{/* clear btn */}
						<div className="clear">
							<button
								className="rewindBtns clearBtn"
								onClick={clear}
							>
								Clear Canvas
							</button>
						</div>
					</div>
				)}
				<div className="whiteboardContainer mb-7">
					<WhiteBoard
						canvasRef={canvasRef}
						ctxRef={ctxRef}
						elements={elements}
						setElements={setElements}
						tool={tool}
						color={color}
						user={user}
						socket={socket}
					/>
				</div>
			</div>
		</div>
	);
};

export default CanvasPage;
