/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';
import { getClientStore } from '../store';
import routes from '../routes';

const store = getClientStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          {
          renderRoutes(routes)
        }
        </div>
      </BrowserRouter>
    </Provider>
  );
}

Loadable.preloadReady().then(() => {
  hydrate(<App />, document.getElementById('root'));
});
