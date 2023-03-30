import { configureStore } from '@reduxjs/toolkit';
import textboxSlice from './text-box-store';

const Store = configureStore({
	reducer: {
		canvas: textboxSlice.reducer,
	},
});

export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;

export default Store;
