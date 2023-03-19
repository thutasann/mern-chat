import { Avatar, Box, Text } from '@chakra-ui/react';
import React from 'react';
import { UserProps } from '../../types';

interface UserListProps {
	user: UserProps;
	handleFunction: () => void;
}

const UserList: React.FC<UserListProps> = ({ user, handleFunction }) => {
	return (
		<Box
			mt={2}
			onClick={handleFunction}
			cursor="pointer"
			fontWeight={500}
			bg="#E8E8E8"
			_hover={{
				background: '#38B2AC',
				color: 'white',
				transition: 'all 0.4s',
				transitionTimingFunction: 'ease-in-out',
			}}
			w="100%"
			display="flex"
			alignItems="center"
			color="black"
			px={3}
			py={2}
			mb={2}
			borderRadius="lg"
		>
			<Avatar
				mr={2}
				size="sm"
				cursor="pointer"
				name={user.name}
				src={user.pic}
			/>
			<Box>
				<Text>{user.name}</Text>
				<Text fontSize="xs">
					<b>Email : </b>
					{user.email}
				</Text>
			</Box>
		</Box>
	);
};

export default UserList;
