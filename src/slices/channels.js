/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channels',
  initialState: { byId: {}, allIds: [] },
  reducers: {
    init(state, action) {
      // console.log(state, action);
      const result = { byId: {}, allIds: [] };
      action.payload.channels.forEach((channel) => {
        result.byId[channel.id] = channel;
        result.allIds.push(channel.id);
      });
      return result;
    },
    add(state, action) {
      const channel = action.payload;
      state.byId[channel.id] = channel;
      state.allIds.push(channel.id);
    },
    remove(state, action) {
      const { id } = action.payload;
      delete state.byId[id];
      state.allIds = state.allIds.filter((usedId) => usedId !== id);
    },
    rename(state, action) {
      const newName = action.payload.name;
      const { id } = action.payload;
      state.byId[id].name = newName;
    },
    reset: () => ({ byId: {}, allIds: [] }),
  },
});

export const {
  init, add, remove, rename, reset,
} = slice.actions;
export default slice.reducer;
