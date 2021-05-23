import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

render(
  <App />,
  document.querySelector('#chat'),
);
