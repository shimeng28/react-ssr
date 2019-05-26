import Home from 'Container/Home';
import NotFound from 'Container/NotFound';
import App from 'Components/App';

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
