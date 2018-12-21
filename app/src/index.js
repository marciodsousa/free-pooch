import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.scss';

import { Provider } from 'react-redux'
import store from "./store"


ReactDOM.render(
  <Provider store={store}>
      <App/>
  </Provider>,
  document.getElementById('root')
);




// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <Provider store={store}>
          <NextApp/>
      </Provider>,
      document.getElementById('root')
    );
  });
}

registerServiceWorker();
