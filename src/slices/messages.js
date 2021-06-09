/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import * as channelsActions from './channels.js';

const slice = createSlice({
  name: 'messages',
  initialState: { byId: {}, byChannelId: {}, allIds: [] },
  reducers: {
    init(state, action) {
      // console.log(state, action);
      const { messages } = action.payload;
      const result = { byId: {}, byChannelId: {}, allIds: [] };
      messages.forEach((message) => {
        result.byId[message.id] = message;
        result.byChannelId[message.channelId] = result.byChannelId[message.channelId] ?? [];
        result.byChannelId[message.channelId].push(message);
        result.allIds.push(message.id);
      });
      return result;
    },
    add(state, action) {
      const message = action.payload;
      state.byId[message.id] = message;
      state.byChannelId[message.channelId] = state.byChannelId[message.channelId] ?? [];
      state.byChannelId[message.channelId].push(message);
      state.allIds.push(message.id);
    },
    reset: () => ({ byId: {}, byChannelId: {}, allIds: [] }),
  },
  extraReducers: {
    [channelsActions.remove]: (state, action) => {
      const channelId = action.payload.id;
      const messagesIds = state.byChannelId[channelId] ?? [];
      // first
      state.byId = _.omit(state.byId, messagesIds);
      // second
      delete state.byChannelId[channelId];
      // third
      state.allIds = state.allIds.filter((id) => messagesIds.includes(id) === false);
    },
  },
});

export const { init, add, reset } = slice.actions;
export default slice.reducer;
