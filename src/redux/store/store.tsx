import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {destinationSlice} from '../slices/destination';

const rootReducers = combineReducers({
  destination: destinationSlice.reducer,
});

export const store = configureStore({
  reducer: {
    destination: destinationSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type TypedDispatch = typeof store.dispatch;
