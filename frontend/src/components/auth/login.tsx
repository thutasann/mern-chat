import React, { useState } from 'react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Button, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
	const navigate = useNavigate();
	const toast = useToast();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [show, setShow] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const handleShowPassoword = () => setShow(!show);

	const submitHandler = async () => {
		setLoading(true);
		if (!email || !password) {
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
		try {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};
			const { data } = await axios.post(
				'/api/user/login',
				{ email, password },
				config,
			);
			toast({
				title: 'Login Successful!',
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
			<Button
				colorScheme="teal"
				width="100%"
				style={{ marginTop: 15 }}
				onClick={submitHandler}
				disabled={loading}
				isLoading={loading}
			>
				Login
			</Button>
			<Button
				variant="solid"
				colorScheme="gray"
				width="100%"
				style={{ marginTop: 2 }}
				onClick={() => {
					setEmail('guest@example.com');
					setPassword('123456');
				}}
			>
				Login as Guest
			</Button>
		</VStack>
	);
};

export default Login;
