import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'auth',
  initialState: { username: localStorage.getItem("username"), token: localStorage.getItem("token") },
  reducers: {
    login(state, action) {
      const { username, token } = action.payload;
      state.username = username;
      state.token = token;
    },
    logout(state) {
      delete state.username;
      delete state.token;
      localStorage.removeItem("username");
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = slice.actions;

export default slice.reducer;