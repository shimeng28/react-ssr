/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Loadable from 'react-loadable';

const loading = () => <div>Loading...</div>;

const WrapApp = Loadable({
  loader: () => import('./components/App'),
  loading,
});

const WrapHome = Loadable({
  loader: () => import('./container/Home'),
  loading,
});

const WrapLogin = Loadable({
  loader: () => import('./container/Login'),
  loading,
});

const WrapNotFound = Loadable({
  loader: () => import('./container/NotFound'),
  loading,
});

export default [
  {
    path: '/',
    component: WrapApp,
    routes: [
      {
        path: '/',
        component: WrapHome,
        exact: true,
        key: 'home',
      },
      {
        path: '/login',
        component: WrapLogin,
        exact: true,
        key: 'login',
      },
      {
        component: WrapNotFound,
      },
    ],
  },
];
