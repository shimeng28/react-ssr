import Home from './container/Home';
import NotFound from './container/NotFound';
import App from './app';

export default [
  {
    path: '/',
    component: App,
    loadData: App.loadData,
    routes: [
      {
        path: '/',
        component: Home,
        exact: true,
        loadData: Home.loadData,
        key: 'home',
      },
      {
        component: NotFound
      }
    ]
  }
];
