import React from 'react';
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverArrow,
	PopoverCloseButton,
} from '@chakra-ui/react';
import { BsFillInfoCircleFill } from 'react-icons/bs';

interface ITicHeader {
	roomId: string;
}

const TicHeader: React.FC<ITicHeader> = ({ roomId }) => {
	return (
		<div className="flex items-center gap-2 mb-3">
			<h1 className="font-semibold text-2xl uppercase">Tic Tac Toe</h1>
			<Popover>
				<PopoverTrigger>
					<button>
						<BsFillInfoCircleFill
							size={20}
							className="text-gray-700 hover:text-gray-600"
						/>
					</button>
				</PopoverTrigger>
				<PopoverContent>
					<PopoverArrow />
					<PopoverCloseButton />
					<PopoverHeader fontWeight={600}>Room Info!</PopoverHeader>
					<PopoverBody>
						<div className="mb-2">
							<span className="font-bold">RoomID : </span> <span>{roomId}</span>{' '}
						</div>
						<p className="text-[14px] font-[500]">
							You are now arrving at <br /> the Tic-Tac-Toe Game Room.
						</p>
					</PopoverBody>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default TicHeader;
