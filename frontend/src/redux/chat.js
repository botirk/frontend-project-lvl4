import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'auth',
  initialState: { selectedChat: localStorage.getItem("selectedChat") },
  reducers: {
    selectChat(state, action) {
      localStorage.setItem("selectedChat", action.payload);
      state.selectedChat = action.payload;
    },
  },
});

export const { selectChat } = slice.actions;

export default slice.reducer;