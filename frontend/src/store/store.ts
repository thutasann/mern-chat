import { configureStore } from '@reduxjs/toolkit';
import textboxSlice from './slices/text-box-store';
import ticUserSlice from './slices/tic-user';

const Store = configureStore({
	reducer: {
		canvas: textboxSlice.reducer,
		ticUser: ticUserSlice.reducer,
	},
});

export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;

export default Store;
