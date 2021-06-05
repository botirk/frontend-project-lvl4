import { createSlice } from '@reduxjs/toolkit';
import * as channelsActions from '../slices/channels.js';

const slice = createSlice({
  name: 'currentChannelId',
  initialState: {id: -1, wait: undefined },
  reducers: {
    set(state, action) {
      state.id = action.payload;
    },
    wait(state, action) {
      state.wait = action.payload;
    },
    reset: () => ({id: -1, wait: undefined }),
  },
  extraReducers: {
    [channelsActions.add]: (state, action) => {
      const channel = action.payload;
      if (channel.name !== state.wait) return;
      state.id = channel.id;
      state.wait = undefined;
    },
    [channelsActions.remove]: (state, action) => {
      const id = action.payload.id;
      if (id === state.id) state.id = 1;
    },
  },
})

export const { set, wait, reset } = slice.actions;
export default slice.reducer;
