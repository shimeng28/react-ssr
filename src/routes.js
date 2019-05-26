import App from 'Components/App';
import Home from 'Container/Home';
import Login from 'Container/Login';
import NotFound from 'Container/NotFound';



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
        path: '/login',
        component: Login,
        exact: true,
        key: 'login',
      },
      {
        component: NotFound
      }
    ]
  }
];
