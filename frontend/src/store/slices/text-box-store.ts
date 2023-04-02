import { createSlice } from '@reduxjs/toolkit';
import { textBoxSliceProps } from '../../types';

const initialState: textBoxSliceProps = {
	B_color: 'white',
	pencolor: 'black',
	stroke: 2,
	canvaVal: null,
};

const textboxSlice = createSlice({
	name: 'textbox',
	initialState,
	reducers: {
		setColor(state, action) {
			state.B_color = action.payload;
		},
		setPencolor(state, action) {
			state.pencolor = action.payload;
		},
		setStroke(state, action) {
			state.stroke = action.payload;
		},
		setCanva(state, action) {
			state.canvaVal = action.payload;
		},
	},
});

export const actions = textboxSlice.actions;
export default textboxSlice;
