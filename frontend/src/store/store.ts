import { configureStore, Reducer } from '@reduxjs/toolkit';
import textboxSlice from './slices/text-box-store';
import { ticUserReducer } from './slices/tic-user';
import typeRaceSlice from './slices/type-race';

const Store = configureStore({
	reducer: {
		canvas: textboxSlice.reducer,
		ticUser: ticUserReducer,
		typeRacer: typeRaceSlice.reducer,
	},
});

export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;

export default Store;
