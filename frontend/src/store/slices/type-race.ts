import { createSlice } from '@reduxjs/toolkit';
import { ReduxTypeRaceGameProps } from '../../types';

const initialState: ReduxTypeRaceGameProps = {
	typeRaceGame: {
		_id: '',
		isOpen: false,
		players: [],
		words: [],
	},
};

const typeRaceSlice = createSlice({
	name: 'typeRace',
	initialState,
	reducers: {
		setGameState(state, action) {
			state.typeRaceGame = action.payload;
		},
	},
});

export const actions = typeRaceSlice.actions;
export default typeRaceSlice;
