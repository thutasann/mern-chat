import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InitialContextProps, UserProps } from '../types';

interface Props {
	children: React.ReactNode;
}

const ChatContext = createContext<InitialContextProps | null>(null);

export const ChatProvider = ({ children }: Props) => {
	const [user, setUser] = useState<UserProps>();
	const navigate = useNavigate();

	useEffect(() => {
		const userInfo: UserProps = JSON.parse(localStorage.getItem('userInfo')!);
		setUser(userInfo);

		if (!userInfo) {
			navigate('/');
		}
	}, [navigate]);

	return (
		<ChatContext.Provider
			value={{
				user,
				setUser,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

export const ChatState = () => {
	return useContext(ChatContext) as InitialContextProps;
};
