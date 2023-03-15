import React, { useState } from 'react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Button, useToast, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
	const toast = useToast();
	const navigate = useNavigate();
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [pic, setPic] = useState<any>();
	const [show, setShow] = useState<boolean>(false);
	const [confirmShow, setConfirmShow] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const handleShowPassoword = () => setShow(!show);
	const handleConfirmShowPassword = () => setConfirmShow(!confirmShow);

	/**
	 * Upload Image to Cloudinary
	 * @param pics
	 * @returns
	 */
	const postDetails = (pics: any) => {
		setLoading(true);
		if (pics === undefined) {
			toast({
				title: 'Please select an Image!',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			setLoading(false);
			return;
		}
		if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
			const data = new FormData();
			data.append('file', pics);
			data.append('upload_preset', 'chat-app');
			data.append('cloud_name', 'ttscloud');
			fetch('https://api.cloudinary.com/v1_1/ttscloud/image/upload', {
				method: 'POST',
				body: data,
			})
				.then((res) => res.json())
				.then((data) => {
					console.log('data', data);
					setPic(data.url.toString());
					setLoading(false);
				})
				.catch((err) => {
					console.error(err);
					setLoading(false);
				});
		} else {
			toast({
				title: 'Please select an Image!',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			setLoading(false);
			return;
		}
	};

	/**
	 * SignUp Handler
	 */
	const submitHandler = async () => {
		setLoading(true);
		if (!name || !email || !password || !confirmPassword) {
			toast({
				title: 'Please fill all the Fields!',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			setLoading(false);
			return;
		}
		if (password !== confirmPassword) {
			toast({
				title: 'Passwords do not match!',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			setLoading(false);
			return;
		}

		try {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};
			const { data } = await axios.post(
				'/api/user',
				{
					name,
					email,
					password,
					pic,
				},
				config,
			);
			toast({
				title: 'Registration Successful',
				status: 'success',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			localStorage.setItem('userInfo', JSON.stringify(data));
			setLoading(false);
			navigate('/chats');
		} catch (error: any) {
			setLoading(false);
			toast({
				title: 'Something went wrong',
				status: error.response.data.message,
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
		}
	};

	return (
		<VStack
			spacing="5px"
			gap={4}
		>
			<FormControl
				id="full-name"
				isRequired
			>
				<FormLabel>Full Name</FormLabel>
				<Input
					value={name}
					placeholder="Enter Your Name"
					onChange={(e) => setName(e.target.value)}
				/>
			</FormControl>
			<FormControl
				id="email"
				isRequired
			>
				<FormLabel>Email</FormLabel>
				<Input
					value={email}
					placeholder="Enter Email"
					onChange={(e) => setEmail(e.target.value)}
				/>
			</FormControl>
			<FormControl
				id="password"
				isRequired
			>
				<FormLabel>Password</FormLabel>
				<InputGroup>
					<Input
						value={password}
						type={show ? 'text' : 'password'}
						placeholder="Enter Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<InputRightElement width="4.5rem">
						<Button
							h="1.75rem"
							size="sm"
							onClick={handleShowPassoword}
						>
							{show ? 'Hide' : 'Show'}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>
			<FormControl
				id="password"
				isRequired
			>
				<FormLabel>Confirm Password</FormLabel>
				<InputGroup>
					<Input
						value={confirmPassword}
						type={confirmShow ? 'text' : 'password'}
						placeholder="Confirm Password"
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<InputRightElement width="4.5rem">
						<Button
							h="1.75rem"
							size="sm"
							onClick={handleConfirmShowPassword}
						>
							{confirmShow ? 'Hide' : 'Show'}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>

			<FormControl id="pic">
				<FormLabel>Upload Your Picture (Optional)</FormLabel>
				<Input
					type="file"
					p={1.5}
					accept="image/*"
					onChange={(e: any) => postDetails(e.target.files[0])}
				/>
			</FormControl>

			<Button
				colorScheme="teal"
				width="100%"
				style={{ marginTop: 15 }}
				onClick={submitHandler}
				isLoading={loading}
				disabled={loading}
			>
				Sign Up
			</Button>
		</VStack>
	);
};

export default SignUp;
