export const addUser =
	(userName: string, userId: string) => async (dispatch) => {
		dispatch({
			type: 'AddUser',
			payload: {
				userName,
				userId,
			},
		});
	};
