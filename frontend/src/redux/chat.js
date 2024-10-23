/* eslint-disable
no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { isBigWindow } from '../utils';

const slice = createSlice({
  name: 'chat',
  initialState: {
    selectedChannel: localStorage.getItem('selectedChannel') || '1',
    sidebar: isBigWindow(),
  },
  reducers: {
    selectChannel(state, action) {
      localStorage.setItem('selectedChannel', action.payload);
      state.selectedChannel = action.payload;
    },
    toggleSidebar(state) {
      state.sidebar = !state.sidebar;
    },
  },
});

export const { selectChannel, toggleSidebar } = slice.actions;

export const selectedChannelSelector = (state) => state.chat.selectedChannel;

export const sidebarSelector = (state) => state.chat.sidebar;

export default slice.reducer;
