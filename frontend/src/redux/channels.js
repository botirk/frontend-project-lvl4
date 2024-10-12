/* eslint-disable
no-param-reassign */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import i18next from 'i18next';
import { toast } from 'react-toastify';
import { selectChannel } from './chat';
import { onQueryStartedErrorToast } from '../utils';

const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/channels',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
      transformResponse: (v) => ({
        ids: v.map((v1) => v1.id),
        entities: v.reduce((prev, cur) => { prev[cur.id] = cur; return prev; }, {}),
      }),
      onQueryStarted: onQueryStartedErrorToast,
    }),
    deleteChannel: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      onCacheEntryAdded: async (arg, api) => {
        const { selectedChannel } = api.getState().chat;
        if (selectedChannel === arg) api.dispatch(selectChannel('1'));
      },
      onQueryStarted: (_, { queryFulfilled }) => {
        onQueryStartedErrorToast(_, { queryFulfilled });
        queryFulfilled.then(() => toast(i18next.t('channelDeleted')));
      },
    }),
    addChannel: builder.mutation({
      query: (name) => ({
        method: 'POST',
        body: { name },
      }),
      onCacheEntryAdded: async (_, api) => api.dispatch(
        selectChannel((await api.cacheDataLoaded).data.id),
      ),
      onQueryStarted: async (_, { queryFulfilled }) => {
        onQueryStartedErrorToast(_, { queryFulfilled });
        queryFulfilled.then(() => toast(i18next.t('channelCreated')));
      },
    }),
    renameChannel: builder.mutation({
      query: ([id, name]) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: { name },
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        onQueryStartedErrorToast(_, { queryFulfilled });
        queryFulfilled.then(() => toast(i18next.t('channelRenamed')));
      },
    }),
  }),
});

export const {
  useGetChannelsQuery, useDeleteChannelMutation, useAddChannelMutation, useRenameChannelMutation,
} = channelsApi;

export default channelsApi;
