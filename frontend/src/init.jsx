/* eslint-disable
no-param-reassign */
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom/client';
import i18next from 'i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import store from './redux/store';
import Login from './pages/login';
import Header from './components/header';
import Chat from './pages/chat';
import { ChatGuard, LoginGuard, SignupGuard } from './components/guards';
import Signup from './pages/signup';
import translation from './translation';
import { filterInit } from './filter';

const init = async () => {
  filterInit();
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
      <RollbarProvider
        config={{
          accessToken: process.env.ROLLBAR,
          captureUncaught: true,
          captureUnhandledRejections: true,
        }}
      >
        <ErrorBoundary>
          <Provider store={store()}>
            <BrowserRouter>
              <ToastContainer />
              <Header />
              <Routes>
                <Route path="/" element={<ChatGuard><Chat /></ChatGuard>} />
                <Route path="login" element={<LoginGuard><Login /></LoginGuard>} />
                <Route path="signup" element={<SignupGuard><Signup /></SignupGuard>} />
                <Route path="*" element={<div>404</div>} />
              </Routes>
            </BrowserRouter>
          </Provider>
        </ErrorBoundary>
      </RollbarProvider>
    </React.StrictMode>,
  );
};

export default init;
