import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import messagesApi from './messages';
import chat from './chat';
import channelsApi from './channels';

const store = () => configureStore({
  reducer: {
    auth,
    chat,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(messagesApi.middleware).concat(channelsApi.middleware),
});

export default store;