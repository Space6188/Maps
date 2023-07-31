import {createSlice} from '@reduxjs/toolkit';
import {DESTINATION_TYPES} from '../../types';

const initialState: DESTINATION_TYPES = {
  data: null,
};

export const destinationSlice = createSlice({
  name: 'destination',
  initialState: initialState,
  reducers: {
    setRoutes: (state, {payload}) => {
      state.data = payload;
    },
  },
});

const {actions, reducer} = destinationSlice;

export const {setRoutes} = actions;

// export const {setNewMarchrute, updateRouteInfo} = actions;
