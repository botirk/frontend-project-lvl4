import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'chat',
  initialState: { selectedChannel: localStorage.getItem("selectedChannel") || "1" },
  reducers: {
    selectChannel(state, action) {
      localStorage.setItem("selectedChannel", action.payload);
      state.selectedChannel = action.payload;
    },
  },
});

export const { selectChannel } = slice.actions;

export default slice.reducer;