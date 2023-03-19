import {
	Avatar,
	Box,
	Button,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	Tooltip,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { ChatState } from '../context/chat-provider';
import ProfileModal from './profile-modal';
import { useNavigate } from 'react-router-dom';

const Drawer: React.FC = () => {
	const navigate = useNavigate();
	const { user } = ChatState();
	const [search, setSearch] = useState<string>('');
	const [searchResults, setSearchResults] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [loadingchat, setLoadingchat] = useState();

	const logoutHandler = () => {
		localStorage.removeItem('userInfo');
		navigate('/');
	};

	return (
		<>
			<Box
				display={'flex'}
				justifyContent={'space-between'}
				alignItems="center"
				bg="white"
				w="100%"
				p="5px 10px 5px 10px"
				borderWidth={'5px'}
			>
				<Tooltip
					label="Search Users to chat"
					hasArrow
					placement="bottom-end"
				>
					<Button variant="ghost">
						<IoSearchOutline />
						<Text
							px="4"
							display={{
								base: 'none',
								md: 'flex',
							}}
						>
							Search User
						</Text>
					</Button>
				</Tooltip>

				<Text
					fontSize="2xl"
					fontWeight={'bold'}
				>
					MERN CHAT
				</Text>

				<div>
					<Menu>
						<MenuButton p={1}>
							<BellIcon
								fontSize={'2xl'}
								m={1}
							/>
						</MenuButton>
					</Menu>
					<Menu>
						<MenuButton
							as={Button}
							rightIcon={<ChevronDownIcon />}
						>
							<Avatar
								size="sm"
								cursor={'pointer'}
								name={user.name}
								src={user.pic}
							/>
						</MenuButton>
						<MenuList>
							<ProfileModal user={user}>
								<MenuItem>My Profile</MenuItem>
							</ProfileModal>
							<MenuItem onClick={logoutHandler}>Logout</MenuItem>
						</MenuList>
					</Menu>
				</div>
			</Box>
		</>
	);
};

export default Drawer;
