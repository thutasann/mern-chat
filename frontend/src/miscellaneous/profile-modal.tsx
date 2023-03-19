import React, { FC } from 'react';
import { ViewIcon } from '@chakra-ui/icons';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Image,
	Button,
	IconButton,
	useDisclosure,
	Text,
} from '@chakra-ui/react';
import { UserProps } from '../types';

interface Props {
	user: UserProps;
	children: React.ReactNode;
}

const ProfileModal: FC<Props> = ({ user, children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			{children ? (
				<span onClick={onOpen}>{children}</span>
			) : (
				<IconButton
					display={{ base: 'flex' }}
					icon={<ViewIcon />}
					onClick={onOpen}
					aria-label={'modal open'}
				/>
			)}
			<Modal
				size={'lg'}
				isOpen={isOpen}
				onClose={onClose}
				isCentered
			>
				<ModalOverlay backdropBlur={'lg'} />
				<ModalContent>
					<ModalHeader
						fontSize={'30px'}
						display="flex"
						fontWeight={700}
						justifyContent={'center'}
					>
						{user.name}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody
						display={'flex'}
						flexDir="column"
						alignItems={'center'}
						justifyContent="space-between"
					>
						<Image
							borderRadius="full"
							boxSize={'150px'}
							src={user.pic}
							alt={user.name}
							loading="lazy"
						/>
						<Text
							mt={3}
							display="flex"
							gap={1}
							fontSize={{
								base: '15px',
								md: '20px',
							}}
						>
							Email: <Text fontWeight={600}>{user.email}</Text>
						</Text>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={onClose}
						>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ProfileModal;
