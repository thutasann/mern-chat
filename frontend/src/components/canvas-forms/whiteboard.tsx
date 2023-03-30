import React from 'react';
import useOnDraw from '../../hooks/useOnDraw';
import { useAppSelector } from '../../store/hook';

const WhiteBoard: React.FC = () => {
	const Bcolor = useAppSelector((state) => state.canvas.B_color);
	const setCanvasRef = useOnDraw();
	return (
		<>
			<canvas
				width={600}
				height={500}
				style={{
					backgroundColor: Bcolor,
				}}
				ref={setCanvasRef}
			/>
		</>
	);
};

export default WhiteBoard;
