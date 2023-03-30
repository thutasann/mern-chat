import React from 'react';

interface SideBarProps {
	openModal: () => void;
	users: any[];
}

const SideBar: React.FC<SideBarProps> = ({ openModal, users }) => {
	return (
		<div className="sidebar">
			<button
				className="joinersBtn mt-3"
				onClick={openModal}
			>
				Joiners : {users?.length || 0}
			</button>
		</div>
	);
};

export default SideBar;
