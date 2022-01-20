import React from 'react';
import ReactDOM from 'react-dom';
import 'sanitize.css';
import './index.css';
import store from 'modules';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// prevent default events
document.ondragstart = () => false;
document.onselectstart = () => false;
document.oncontextmenu = () => false;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
