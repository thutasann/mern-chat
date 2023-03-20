import { CloseIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import React from 'react';
import { UserProps } from '../../types';

interface UserBadgeProps {
	user: UserProps;
	handleFunction: () => void;
}

const UserBadge: React.FC<UserBadgeProps> = ({ user, handleFunction }) => {
	return (
		<Box
			px={2}
			py={1}
			borderRadius="lg"
			m={1}
			mb={2}
			fontSize={12}
			background="teal"
			_hover={{
				backgroundColor: '#008B8B',
			}}
			color={'white'}
			cursor="pointer"
			onClick={handleFunction}
		>
			{user.name}
			<CloseIcon
				pl={1}
				onClick={handleFunction}
			/>
		</Box>
	);
};

export default UserBadge;
