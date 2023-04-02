import { configureStore } from '@reduxjs/toolkit';
import textboxSlice from './slices/text-box-store';
import { ticUserReducer } from './slices/tic-user';

const Store = configureStore({
	reducer: {
		canvas: textboxSlice.reducer,
		ticUser: ticUserReducer,
	},
});

export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;

export default Store;
