import {createSlice} from '@reduxjs/toolkit';
import {DESTINATION_TYPES} from '../../types';

const initialState: DESTINATION_TYPES = {
  routeInfo: null,
  location: {
    startPoint: '',
    endPoint: '',
  },
};

export const destinationSlice = createSlice({
  name: 'destination',
  initialState: initialState,
  reducers: {
    setNewMarchrute(
      state: DESTINATION_TYPES,
      {payload}: {payload: Pick<DESTINATION_TYPES, 'location'>},
    ) {
      state.location = {
        startPoint: payload.location.startPoint,
        endPoint: payload.location.endPoint,
      };
    },
    updateRouteInfo: (
      state,
      {payload}: {payload: Pick<DESTINATION_TYPES, 'routeInfo'>},
    ) => {
      state.routeInfo = {
        distance: payload.routeInfo!.distance,
        duration: payload.routeInfo!.duration,
        startPointAdress: {
          global: payload.routeInfo!.startPointAdress.global,
          street: payload.routeInfo!.startPointAdress.street,
        },
        endPointAdress: {
          global: payload.routeInfo!.endPointAdress.global,
          street: payload.routeInfo!.endPointAdress.street,
        },
      };
    },
  },
});

const {actions, reducer} = destinationSlice;

export const {setNewMarchrute, updateRouteInfo} = actions;
