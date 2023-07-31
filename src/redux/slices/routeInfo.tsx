import {createSlice} from '@reduxjs/toolkit';

const initialState: {
  info: {
    time: number;
    dest: string;
    origin: string;
  } | null;
} = {
  info: null,
};

export const routeInfoSlice = createSlice({
  name: 'destination',
  initialState: initialState,
  reducers: {
    setRouteInfo: (state, {payload}) => {
      state.info = payload;
    },
  },
});

const {actions, reducer} = routeInfoSlice;

export const {setRouteInfo} = actions;
