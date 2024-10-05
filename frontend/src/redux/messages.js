import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/v1/messages',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set('authorization', `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
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

export const { useGetMessagesQuery } = messagesApi;

export default messagesApi;