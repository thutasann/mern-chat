import React from 'react';
import { useAppSelector } from '../../store/hook';

const WhiteBoard: React.FC = () => {
	const Bcolor = useAppSelector((state) => state.canvas.B_color);
	return (
		<>
			<canvas
				className="w-full h-full rounded-md"
				style={{
					backgroundColor: Bcolor,
				}}
			/>
		</>
	);
};

export default WhiteBoard;
