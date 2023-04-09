import React from 'react';
import {
	useToast,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverArrow,
	PopoverCloseButton,
} from '@chakra-ui/react';
import { BsFillInfoCircleFill } from 'react-icons/bs';

interface ITYpeRaceHeader {
	gameId: string;
	onClick: () => void;
}

const TypeRaceHeader: React.FC<ITYpeRaceHeader> = ({ gameId, onClick }) => {
	return (
		<div className="flex items-center gap-2 mb-7">
			<h1 className="font-semibold text-2xl uppercase">Typing Race</h1>
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
						<div
							className="mb-2 cursor-pointer hover:opacity-60"
							onClick={onClick}
						>
							<span className="font-bold ">GameID : </span>{' '}
							<span>{gameId}</span>
						</div>
					</PopoverBody>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default TypeRaceHeader;
