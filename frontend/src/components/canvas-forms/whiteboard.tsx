/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState, useLayoutEffect } from 'react';
import rough from 'roughjs';

const WhiteBoard = ({
	canvasRef,
	ctxRef,
	elements,
	setElements,
	tool,
	color,
	user,
	socket,
}) => {
	const [isDrawing, setIsDrawing] = useState(false);
	const [img, setImg] = useState('');
	console.log('user', user);
	const roughGenerator = rough.generator()!;

	// Socket whiteboardDataResponse
	useEffect(() => {
		socket.on('whiteboardDataResponse', (data) => {
			setImg(data?.imgURL);
		});
	}, []);

	// If Not a Presenter
	if (!user?.presenter) {
		return (
			<div className="w-full h-full overflow-hidden">
				<img
					src={img}
					alt="RealTime whiteboard app"
					className="w-full h-full"
				/>
			</div>
		);
	}

	useEffect(() => {
		if (canvasRef) {
			const canvas = canvasRef.current;
			canvas.height = window.innerHeight * 2;
			canvas.width = window.innerWidth * 2;
			const ctx = canvas?.getContext('2d');

			ctx.strokeStyle = color;
			ctx.lineWidth = 2;
			ctx.lineCap = 'round';

			ctxRef.current = ctx;
		}
	}, []);

	useEffect(() => {
		ctxRef.current.strokeStyle = color;
	}, [color]);

	useLayoutEffect(() => {
		if (canvasRef) {
			const roughCanvas = rough?.canvas(canvasRef?.current);

			if (elements.length > 0) {
				ctxRef.current.clearRect(
					0,
					0,
					canvasRef.current.width,
					canvasRef.current.height,
				);
			}

			elements.forEach((element) => {
				if (element.type === 'rect') {
					roughCanvas.draw(
						roughGenerator.rectangle(
							element.offsetX,
							element.offsetY,
							element.width,
							element.height,
							{
								stroke: element.stroke,
								strokeWidth: 5,
								roughness: 0,
							},
						),
					);
				} else if (element.type === 'line') {
					roughCanvas.draw(
						roughGenerator.line(
							element.offsetX,
							element.offsetY,
							element.width,
							element.height,
							{
								stroke: element.stroke,
								strokeWidth: 5,
								roughness: 0,
							},
						),
					);
				} else if (element.type === 'pencil') {
					roughCanvas.linearPath(element.path, {
						stroke: element.stroke,
						strokeWidth: 5,
						roughness: 0,
					});
				}
			});

			// Canvas Image
			const canvasImage = canvasRef.current.toDataURL();
			socket.emit('whiteboardData', canvasImage);
		}
	}, [elements]);

	/**
	 * Handle Mouse Down
	 */
	const handleMouseDown = (e) => {
		const { offsetX, offsetY } = e.nativeEvent;

		if (tool === 'rectangle') {
			setElements((prevElements) => [
				...prevElements,
				{
					type: 'rect',
					offsetX,
					offsetY,
					width: offsetX,
					height: offsetY,
					stroke: color,
				},
			]);
		} else if (tool === 'pencil') {
			// Pencil
			setElements((prevElements) => [
				...prevElements,
				{
					type: 'pencil',
					offsetX,
					offsetY,
					path: [[offsetX, offsetY]],
					stroke: color,
				},
			]);
		} else if (tool === 'line') {
			// Line
			setElements((prevElements) => [
				...prevElements,
				{
					type: 'line',
					offsetX,
					offsetY,
					width: offsetX,
					height: offsetY,
					stroke: color,
				},
			]);
		}
		setIsDrawing(true);
	};

	/**
	 * Handle Mouse Move
	 */
	const handleMouseMove = (e) => {
		const { offsetX, offsetY } = e.nativeEvent;
		if (isDrawing) {
			if (tool === 'pencil') {
				const { path } = elements[elements.length - 1];
				const newPath = [...path, [offsetX, offsetY]];

				setElements((prevElements) =>
					prevElements.map((ele, index) => {
						if (index === elements.length - 1) {
							return {
								...ele,
								path: newPath,
							};
						} else {
							return ele;
						}
					}),
				);
			} else if (tool === 'line') {
				setElements((prevElements) =>
					prevElements.map((ele, index) => {
						if (index === elements.length - 1) {
							return {
								...ele,
								width: offsetX,
								height: offsetY,
							};
						} else {
							return ele;
						}
					}),
				);
			} else if (tool === 'rectangle') {
				setElements((prevElements) =>
					prevElements.map((ele, index) => {
						if (index === elements.height - 1) {
							return {
								...ele,
								width: offsetX - ele.offsetX,
								height: offsetY - ele.offsetY,
							};
						} else {
							return ele;
						}
					}),
				);
			}
		}
	};

	/**
	 * Handle Mouse up
	 */
	const handleMouseUp = (e) => {
		setIsDrawing(false);
	};

	return (
		<div
			className="w-full h-full overflow-hidden"
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
		>
			<canvas ref={canvasRef} />
		</div>
	);
};

export default WhiteBoard;
