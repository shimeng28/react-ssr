import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { getClientStore } from 'Store';
import Loadable from 'react-loadable';
import routes from '../routes';

const store = getClientStore();

const App = () => (
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

Loadable.preloadReady().then(() => {
  hydrate(<App />, document.getElementById('root'));
});
