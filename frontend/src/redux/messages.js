/* eslint-disable
no-param-reassign */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { onQueryStartedErrorToast } from '../utils';

const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/messages',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
      transformResponse: (v) => ({
        ids: v.map((v1) => v1.id),
        entities: v.reduce((prev, cur) => { prev[cur.id] = cur; return prev; }, {}),
      }),
      onQueryStarted: onQueryStartedErrorToast,
    }),
    postMessage: builder.mutation({
      query: ([channel, username, body]) => ({
        method: 'POST',
        body: { channel, body, username },
      }),
      onQueryStarted: onQueryStartedErrorToast,
    }),

  }),
});

export const { useGetMessagesQuery, usePostMessageMutation } = messagesApi;

export default messagesApi;
