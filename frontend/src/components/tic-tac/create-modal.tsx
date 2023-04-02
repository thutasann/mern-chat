import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CreateRoomSVG } from '../illustrations';
import { nanoid } from 'nanoid';
import { useAppSelector } from '../../store/hook';
import { Button, FormControl, Input } from '@chakra-ui/react';

type Props = {
	createModal: any;
	setCreateModal: any;
};
const roomId: string = nanoid(7);

function CreateModal({ createModal, setCreateModal }: Props) {
	const { userName, userId } = useAppSelector((state) => state.ticUser.user);
	const [copyBtnValue, setCopyBtnValue] = useState<string>('Copy');
	const [copied, setCopied] = useState<boolean>(false);

	const closeModal = () => {
		setCreateModal(false);
	};

	function copyText() {
		navigator.clipboard.writeText(roomId);

		setCopyBtnValue('Copied!');
		setCopied(true);

		setInterval(() => {
			setCopyBtnValue('Copy');
			setCopied(false);
		}, 3000);
	}

	return (
		<div>
			<Transition
				appear
				show={createModal}
				as={Fragment}
			>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={closeModal}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 backdrop-filter backdrop-blur-sm bg-opacity-10" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex items-center justify-center min-h-full p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-gray-50 border border-gray-100 shadow-xl rounded-2xl">
									<Dialog.Title
										as="h3"
										className="flex items-center justify-center 
                                        space-x-2 text-[21px]  leading-6 text-gray-700 font-bold"
									>
										Create Room
									</Dialog.Title>
									<div className="flex relative  flex-col items-center justify-center">
										<CreateRoomSVG />
										<FormControl
											width="auto"
											display="flex"
											alignItems="center"
										>
											<Input
												placeholder="Enter your Name"
												width={120}
												color="gray.800"
												borderColor="gray"
												roundedRight={0}
												value={roomId}
												readOnly
												cursor="not-allowed"
												_hover={{
													border: '1px solid gray',
												}}
												_focus={{
													outline: 'none',
													ring: 'none',
													border: '1px solid gray',
												}}
											/>
											<Button
												variant="solid"
												background={'teal.600'}
												color="white"
												ml={1}
												borderLeftRadius={0}
												_hover={{
													backgroundColor: 'teal',
												}}
												onClick={copyText}
											>
												{copyBtnValue}
											</Button>
										</FormControl>
										<button
											type="submit"
											className="mt-2 w-[200px] bg-slate-600 text-white py-3 px-4 rounded-md transition-all duration-700 ease-in-out text-[16px] hover:bg-slate-700 font-[700]"
										>
											Create Room
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
}

export default CreateModal;
