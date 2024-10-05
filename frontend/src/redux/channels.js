import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/v1/channels',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set('authorization', `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
      transformResponse: (v) => {
        return {
          ids: v.map(v => v.id),
          entities: v.reduce((prev, cur) => { prev[cur.id] = cur; return prev; },{}),
        }
      },
    }),
  }),
});

export const { useGetChannelsQuery } = channelsApi;

export default channelsApi;