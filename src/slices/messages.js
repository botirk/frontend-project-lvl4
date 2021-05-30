import { createSlice } from '@reduxjs/toolkit';
import * as channelsAction from './channels.js';

const slice = createSlice({
  name: 'messages',
  initialState: {byId:{}, byChannelId:{}, allIds:[]},
  reducers: {
    init(state, action) {
      //console.log(state, action);
      const result = {byId:{}, byChannelId:{}, allIds:[]};
      action.payload.messages.forEach((message) => {
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
    reset: () => ({byId:{}, byChannelId:{}, allIds:[]}),
  },
})

export const { init, add, reset } = slice.actions;
export default slice.reducer;