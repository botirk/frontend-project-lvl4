import React from 'react';
import i18next from 'i18next';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import locales from './locales/index.js';
import store from './store.js';
import { forceSocket } from './socketAbstraction.js';

export default async (socket = undefined) => {
  // translations
  if (!i18next.isInitialized) {
    await i18next.init({
      lng: 'ru',
      debug: process.env.NODE_ENV !== 'production',
      resources: locales,
    });
  }
  // socket
  if (socket !== undefined) forceSocket(socket);
  // redux + react
  return <Provider store={store()}><App /></Provider>;
};
