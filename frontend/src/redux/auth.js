/* eslint-disable
no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const slice = createSlice({
  name: 'auth',
  initialState: { username: localStorage.getItem('username'), token: localStorage.getItem('token') },
  reducers: {
    login(state, action) {
      const { username, token } = action.payload;
      localStorage.setItem('username', username);
      localStorage.setItem('token', token);
      state.username = username;
      state.token = token;
    },
    logout(state) {
      delete state.username;
      delete state.token;
      localStorage.removeItem('username');
      localStorage.removeItem('token');
    },
  },
});

export const { login, logout } = slice.actions;

export const useIsLogin = () => {
  const { username, token } = useSelector((state) => state.auth);
  return !!username && !!token;
};

export const usernameSelector = (state) => state.auth.username;

export default slice.reducer;
