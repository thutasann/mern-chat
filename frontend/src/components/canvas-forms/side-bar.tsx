import React from 'react';
import { HiUserGroup } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { useAppSelector } from '../../store/hook';
import { useAppDispatch } from '../../store/hook';
import { actions } from '../../store/text-box-store';

interface SideBarProps {
	openModal: () => void;
	users: any[];
}

const SideBar: React.FC<SideBarProps> = ({ openModal, users }) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const toast = useToast();
	const initialHeight = useAppSelector((state) => state.canvas.height);
	const initialWidth = useAppSelector((state) => state.canvas.height);
	const initialColor = useAppSelector((state) => state.canvas.B_color);
	const initialStroke = useAppSelector((state) => state.canvas.stroke);
	const current = useAppSelector((state) => state.canvas.canvaVal);

	function changeHeight(val: number) {
		dispatch(actions.setHeight(val));
	}

	function changeWidth(val: number) {
		dispatch(actions.setWidth(val));
	}

	function changeColor(val: string) {
		dispatch(actions.setColor(val));
	}

	function changePenColor(val: string) {
		dispatch(actions.setPencolor(val));
	}

	function changeStrokeWidth(val: number) {
		dispatch(actions.setStroke(val));
	}

	async function handleDownload(current) {
		if (!current) {
			toast({
				title: 'Drawing something First!',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
		}
		const image = current.toDataURL('image/jpg');
		const blob = await (await fetch(image)).blob();
		const blobUrl = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = blobUrl;
		link.download = 'canvas.jpg';
		link.click();
	}

	return (
		<div className="sidebar">
			<div className="flex items-center gap-2 border-b pb-5">
				<button
					onClick={() => navigate('/games')}
					className="joinersBtn mt-3 bg-red-400 hover:bg-red-500"
				>
					Exit
				</button>
				<button
					className="joinersBtn mt-3 flex items-center gap-2"
					onClick={openModal}
				>
					<HiUserGroup
						className="-mt-1"
						size={17}
					/>{' '}
					: {users?.length || 0}
				</button>
			</div>
		</div>
	);
};

export default SideBar;
