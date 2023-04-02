import { createReducer, createSlice } from '@reduxjs/toolkit';
import { TicUserProps } from '../../types';

const initialState: TicUserProps = {
	user: {
		userId: '',
		userName: '',
	},
};

export const ticUserReducer = createReducer(initialState, {
	AddUser: (state, action) => {
		state.user = action.payload;
	},
});