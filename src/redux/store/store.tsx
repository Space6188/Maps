import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {destinationSlice} from '../slices/destination';
import {api} from '../api/api';
import {routeInfoSlice} from '../slices/routeInfo';

const rootReducers = combineReducers({
  destination: destinationSlice.reducer,
  [api.reducerPath]: api.reducer,
  routeInfo: routeInfoSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducers,
  middleware: getDefaultMiddware => getDefaultMiddware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type TypedDispatch = typeof store.dispatch;
