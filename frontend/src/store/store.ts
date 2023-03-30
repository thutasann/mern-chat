import { configureStore } from '@reduxjs/toolkit';
import textboxSlice from './text-box-store';

const Store = configureStore({
	reducer: textboxSlice.reducer,
});

export default Store;
