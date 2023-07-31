import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
const URL = 'https://maps.googleapis.com/maps/api/directions/';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: URL}),
  endpoints: builder => ({
    getRoutes: builder.query<undefined, undefined>({
      query: props =>
        `json?origin=${props.from}&destination=${props.to}&key=AIzaSyAj11goggJzNE-hva2JOqeTDMYsiz7KkE8&sensor=false&alternatives=true`,
    }),
  }),
});

export const {useLazyGetRoutesQuery} = api;
