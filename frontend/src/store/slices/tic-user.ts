import { createReducer, createSlice } from '@reduxjs/toolkit';
import { TicUserProps } from '../../types';

const initialState: TicUserProps = {
	user: {},
};

const TicUserSlice = createSlice({
	name: 'ticUser',
	initialState,
	reducers: {
		AddUser: (state, action) => {
			state.user = action.payload;
		},
	},
});

export const actions = TicUserSlice.actions;
export default TicUserSlice;
