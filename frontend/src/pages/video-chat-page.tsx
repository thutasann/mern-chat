import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Tooltip } from '@chakra-ui/tooltip';
import { isNull } from '@chakra-ui/utils';
import { useEffect, useRef, useState } from 'react';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { ChatState } from '../context/chat-provider';
import SlideDrawer from '../miscellaneous/Drawer';

const VideoChatPage = () => {
	const { user: loggedInUser } = ChatState();
	const myVideo = useRef<any>();
	const userVideo = useRef<any>();
	const [name, setName] = useState<string>('');
	const [idToCall, setIdtoCall] = useState<string>('');
	const [stream, setStream] = useState<any>();
	const [callAccepted, setCallAccepted] = useState<boolean>(false);
	const [receivingCall, setReceivingCall] = useState<boolean>(false);
	const [callEnded, setCallEnded] = useState<boolean>(false);

	console.log('myVideo', myVideo);

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({
				video: true,
				audio: true,
			})
			.then((stream) => {
				setStream(stream);
			});
	}, [myVideo.current]);

	useEffect(() => {
		if (myVideo.current) {
			myVideo.current.srcObject = stream;
		}
	}, [stream]);

	return (
		<>
			{loggedInUser && <SlideDrawer />}
			<div className="mainWrapper mx-3">
				<h1 className="font-semibold text-2xl ">Video Chat</h1>

				<section className="flex flex-col lg:flex-row items-start gap-4 mt-3">
					{/* Videos */}
					<div className="flex items-center gap-4 border p-4 rounded-md shadow-md h-auto lg:h-[258px]">
						<div>
							{stream && (
								<video
									playsInline
									muted
									ref={myVideo}
									autoPlay
									className="video"
								/>
							)}
						</div>
						{callAccepted && !callAccepted ? (
							<div>
								<video
									playsInline
									ref={userVideo}
									autoPlay
									className="video"
								/>
							</div>
						) : null}
					</div>

					{/* Join Info */}
					<div className="w-full lg:w-auto shadow-md p-5 rounded-md border border-gray-200 h-auto lg:h-[258px]">
						<div className="flex items-center">
							<Input
								placeholder="Enter your Name"
								color="gray.800"
								borderColor="gray"
								roundedRight={0}
								spellCheck={false}
								value={name}
								onChange={(e) => setName(e.target.value)}
								_hover={{
									border: '1px solid teal',
								}}
								_focus={{
									outline: 'none',
									ring: 'none',
									border: '1px solid teal',
								}}
							/>
							<Button
								variant="solid"
								background={name ? 'teal.600' : 'gray.600'}
								color="white"
								disabled={!name}
								pointerEvents={!name ? 'none' : 'auto'}
								borderLeftRadius={0}
								_hover={{
									backgroundColor: 'teal',
								}}
							>
								Copy ID
							</Button>
						</div>

						<div className="mt-5">
							<label className="font-bold">Enter ID to be called</label>
							<Input
								placeholder="Enter ID"
								color="gray.800"
								borderColor="gray"
								spellCheck={false}
								value={idToCall}
								onChange={(e) => setIdtoCall(e.target.value)}
								_hover={{
									border: '1px solid teal',
								}}
								_focus={{
									outline: 'none',
									ring: 'none',
									border: '1px solid teal',
								}}
							/>
						</div>

						<div className="mt-3">
							{callAccepted && !callEnded ? (
								<Tooltip
									label="End Call"
									hasArrow
									placement="bottom-end"
								>
									<Button
										variant="solid"
										color="white"
										background="red.600"
										_hover={{
											backgroundColor: 'red',
										}}
									>
										End Call
									</Button>
								</Tooltip>
							) : (
								<Tooltip
									label="Send Call"
									hasArrow
									placement="bottom-end"
								>
									<Button
										variant="solid"
										color="white"
										background={idToCall && name ? 'teal.600' : 'gray.600'}
										disabled={!idToCall && !name}
										pointerEvents={!idToCall && !name ? 'none' : 'auto'}
										_hover={{
											backgroundColor: 'teal',
										}}
										className="flex items-center gap-2"
									>
										<BsFillTelephoneFill /> {idToCall}
									</Button>
								</Tooltip>
							)}
						</div>

						{receivingCall && callAccepted ? (
							<div className="mt-4">
								<h1 className="animate-pulse font-bold text-slate-700">
									{name} is calling...
								</h1>

								<Button
									variant="solid"
									color="white"
									background="telegram.600"
									_hover={{
										backgroundColor: '#005885',
									}}
								>
									Answer
								</Button>
							</div>
						) : null}
					</div>
				</section>
			</div>
		</>
	);
};

export default VideoChatPage;
