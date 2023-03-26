import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FaUserPlus } from 'react-icons/fa';

type Props = {
	isOpen: any;
	setIsOpen: any;
	users: any[];
	user: any;
};

function Modal({ isOpen, setIsOpen, users, user }: Props) {
	const closeModal = () => {
		setIsOpen(false);
	};

	return (
		<div>
			<Transition
				appear
				show={isOpen}
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
                                        space-x-2 text-[18px]  leading-6 text-gray-700 font-bold"
									>
										All Joiners
									</Dialog.Title>
									<div className="mt-5">
										<ul>
											{users?.map((u, index) => (
												<li
													key={index}
													className="text-[15px] text-gray-800 my-3 flex items-center gap-3"
												>
													<FaUserPlus
														size={20}
														color="gray"
													/>{' '}
													<span>
														{u?.name}
														<span className="font-bold ml-1">
															{user && user?.userId === u?.userId && '(You)'}
														</span>
													</span>
												</li>
											))}
										</ul>
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

export default Modal;
