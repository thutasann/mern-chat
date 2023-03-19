import { Skeleton, Stack } from '@chakra-ui/react';
import React from 'react';

const ChatLoading: React.FC = () => {
	return (
		<Stack>
			{[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
				<Skeleton
					key={idx}
					height="45px"
				/>
			))}
		</Stack>
	);
};

export default ChatLoading;
