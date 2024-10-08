/* eslint-disable
functional/no-expression-statement,
functional/no-conditional-statement,
no-param-reassign */
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom/client';
import i18next from 'i18next';
import { Provider, ErrorBoundary } from '@rollbar/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import translation from './translation';

if (!i18next.isInitialized) {
  await i18next.init({
    lng: 'ru',
    debug: process.env.NODE_ENV !== 'production',
    resources: translation,
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider config={{ accessToken: '8adf7b0691044387ac041bd7966d7ec7', captureUncaught: true, captureUnhandledRejections: true }}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
