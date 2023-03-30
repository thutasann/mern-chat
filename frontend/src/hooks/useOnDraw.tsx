import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { actions } from '../store/text-box-store';
import io, { Socket } from 'socket.io-client';
import { PROD_ENDPOINT } from '../util/constants';
import { SocketNames } from '../types';

var socket: Socket;

const useOnDraw = () => {
	var isDrawing: boolean = false;
	const canvasRef = useRef<any>(null);
	const dispatch = useAppDispatch();
	const mousePressed = useRef(false);
	const MouseMoveListenerRef = useRef<any>(null);
	const MouseDownListenerRef = useRef<any>(null);
	const MouseUpListenerRef = useRef<any>(null);
	const previousRef = useRef<any>(null);
	const ctx = useRef<any>(null);

	const StrokeColor = useAppSelector((state) => state.canvas.pencolor);
	const StrokeWidth = useAppSelector((state) => state.canvas.stroke);

	function setCanvasRef(ref) {
		if (!ref) return;
		if (canvasRef.current) {
			canvasRef.current.removeEventListener(
				'mousedown',
				MouseDownListenerRef.current,
			);
		}
		window.removeEventListener('mouseup', MouseUpListenerRef.current);
		window.removeEventListener('mousemove', MouseMoveListenerRef.current);
		canvasRef.current = ref;

		initMouseMoveListener();
		initMouseDownListener();
		initMouseUpListener();
	}

	// Init MouseDownListener
	function initMouseDownListener() {
		if (!canvasRef.current) return;
		const mouseDownEventListener = (e) => {
			mousePressed.current = true;
		};
		MouseDownListenerRef.current = mouseDownEventListener;
		canvasRef.current.addEventListener('mousedown', mouseDownEventListener);
	}

	// Init MouseUpListener
	function initMouseUpListener() {
		if (!canvasRef.current) return;
		const mouseUpEventListener = () => {
			dispatch(actions.setCanva(canvasRef.current));
			mousePressed.current = false;
			previousRef.current = null;
		};
		MouseUpListenerRef.current = mouseUpEventListener;
		window.addEventListener('mouseup', mouseUpEventListener);
	}

	useEffect(() => {
		socket = io(PROD_ENDPOINT);
		socket.on<SocketNames>('isDraw', (data) => {
			ctx.current = canvasRef.current.getContext('2d');
			drawLine(data[0], data[1], data[2], data[3]);
		});
	}, []);

	// Init MouseMoveListener
	function initMouseMoveListener() {
		const mouseMoveEventListener = (e) => {
			if (mousePressed.current) {
				const Point = transformCoordinates(e.clientX, e.clientY);
				ctx.current = canvasRef.current.getContext('2d');
				socket.emit<SocketNames>('draw', [
					previousRef.current,
					Point,
					StrokeColor,
					StrokeWidth,
				]);
				onDraw(Point, previousRef.current);
				previousRef.current = Point;
			}
		};
		MouseMoveListenerRef.current = mouseMoveEventListener;
		window.addEventListener('mousemove', mouseMoveEventListener);
	}

	// On Draw
	function onDraw(Point, previousRef) {
		drawLine(previousRef, Point, StrokeColor, StrokeWidth);
	}

	// Draw Line
	function drawLine(start, end, color, width) {
		if (!start) start = end;
		ctx.current.beginPath();
		ctx.current.lineWidth = width;
		ctx.current.strokeStyle = color;
		ctx.current.moveTo(start.x, start.y);
		ctx.current.lineTo(end.x, end.y);
		ctx.current.stroke();
		ctx.current.fillStyle = color;
		ctx.current.beginPath();
		ctx.current.arc(end.x, end.y, width / 2, 0, 2 * Math.PI);
		ctx.current.fill();
		isDrawing = false;
	}

	// TransForm Coordinates
	function transformCoordinates(clientX, clientY) {
		if (canvasRef.current) {
			const rectangularPoints = canvasRef.current.getBoundingClientRect();
			return {
				x: clientX - rectangularPoints.left,
				y: clientY - rectangularPoints.top,
			};
		} else return null;
	}

	return setCanvasRef;
};

export default useOnDraw;
