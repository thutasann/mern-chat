import { Dispatch } from '@reduxjs/toolkit';

export const addUser =
	(userName: string, userId: string) => async (dispatch: Dispatch) => {
		dispatch({
			type: 'AddUser',
			payload: {
				userName,
				userId,
			},
		});
	};
