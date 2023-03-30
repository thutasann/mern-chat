import React, { useState } from 'react';
import { HiUserGroup } from 'react-icons/hi';
import { BiDownload } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Tooltip, useToast } from '@chakra-ui/react';
import { useAppSelector } from '../../store/hook';
import { useAppDispatch } from '../../store/hook';
import { actions } from '../../store/text-box-store';
import { colors } from '../../util/constants';

interface SideBarProps {
	openModal: () => void;
	users: any[];
}

const SideBar: React.FC<SideBarProps> = ({ openModal, users }) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const toast = useToast();
	const [selectedPenColor, setSelectedPenColor] = useState('');
	const initialColor = useAppSelector((state) => state.canvas.B_color);
	const initialStroke = useAppSelector((state) => state.canvas.stroke);
	const current = useAppSelector((state) => state.canvas.canvaVal);

	function changePenColor(val: any) {
		dispatch(actions.setPencolor(val));
	}

	function changeStrokeWidth(val: any) {
		dispatch(actions.setStroke(val));
	}

	async function handleDownload(current: { toDataURL: (arg0: string) => any }) {
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
			<div className="flex items-center justify-between gap-2 border-b pb-5">
				<div className="flex items-center gap-2">
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

				<div>
					<Tooltip
						label="Download"
						hasArrow
						placement="bottom-end"
					>
						<button
							className="joinersBtn mt-3 bg-transparent border border-teal-500 group"
							onClick={() => handleDownload(current)}
						>
							<BiDownload
								size={19}
								className="text-teal-500 group-hover:text-white duration-700 transition-all"
							/>
						</button>
					</Tooltip>
				</div>
			</div>

			<div className="mt-5 flex flex-col gap-4">
				<div>
					<label>
						Stroke width:
						<input
							type="number"
							value={initialStroke}
							className="input"
							placeholder="Enter Stroke width"
							onChange={(e) => changeStrokeWidth(e.target.value)}
						/>
					</label>
				</div>

				<div>
					<label>Pen Color:</label>
					<div className="w-[250px] mt-2 flex items-center flex-wrap gap-[10px]">
						{colors.map((color, index) => (
							<button
								key={index}
								style={{
									backgroundColor: color,
								}}
								className={`w-[50px] h-[50px] rounded-full border hover:shadow-md border-gray-400 ${
									selectedPenColor === color &&
									'border-2 border-gray-500 shadow-md transition-all duration-200 ease-in-out'
								}`}
								onClick={() => {
									changePenColor(color);
									setSelectedPenColor(color);
								}}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SideBar;
