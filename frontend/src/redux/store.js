import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import messagesApi from './messages';
import chat from './chat';

const store = () => configureStore({
  reducer: {
    auth,
    chat,
    [messagesApi.reducerPath]: messagesApi,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(messagesApi.middleware),
});

export default store;