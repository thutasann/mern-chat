import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SideBarProps {
	openModal: () => void;
	users: any[];
}

const SideBar: React.FC<SideBarProps> = ({ openModal, users }) => {
	const navigate = useNavigate();
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
					className="joinersBtn mt-3"
					onClick={openModal}
				>
					Joiners : {users?.length || 0}
				</button>
			</div>
		</div>
	);
};

export default SideBar;
