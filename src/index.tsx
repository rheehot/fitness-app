import React from 'react';
import ReactDOM from 'react-dom';
import 'sanitize.css';
import store from 'modules';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';

// prevent default events
document.ondragstart = () => false;
document.onselectstart = () => false;
document.oncontextmenu = () => false;

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <PersistGate loading={null} persistor={persistor} />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
