import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'currentChannelId',
  initialState: -1,
  reducers: {
    set(state, action) {
      return action.payload.currentChannelId;
    },
    reset: () => -1,
  },
})

export const { set, reset } = slice.actions;
export default slice.reducer;
