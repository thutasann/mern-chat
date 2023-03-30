import React from 'react';
import useOnDraw from '../../hooks/useOnDraw';
import { useAppSelector } from '../../store/hook';

const WhiteBoard: React.FC = () => {
	const Bcolor = useAppSelector((state) => state.canvas.B_color);
	const { setCanvasRef, handleClearCanvas } = useOnDraw();

	return (
		<div className="relative">
			<canvas
				width={790}
				height={500}
				style={{
					backgroundColor: Bcolor,
				}}
				ref={setCanvasRef}
			/>
		</div>
	);
};

export default WhiteBoard;
