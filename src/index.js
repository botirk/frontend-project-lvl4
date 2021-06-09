/* eslint-disable import/extensions */
import './rollbar.js';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import { render } from 'react-dom';
import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

init().then((vdom) => render(vdom, document.querySelector('#chat')));
