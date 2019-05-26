import Loadable from 'react-loadable';

const loading = () => <div>Loading...</div>;

const WrapApp = Loadable({
  loader: () => import('Components/App'),
  loading,
});

const WrapHome = Loadable({
  loader: () => import('Container/Home'),
  loading,
});

const WrapLogin = Loadable({
  loader: () => import('Container/Login'),
  loading,
});

const WrapNotFound = Loadable({
  loader: () => import('Container/NotFound'),
  loading,
});


export default [
  {
    path: '/',
    component: WrapApp,
    // loadData: WrapApp.loadData,
    routes: [
      {
        path: '/',
        component: WrapHome,
        exact: true,
        // loadData: WrapHome.loadData,
        key: 'home',
      },
      {
        path: '/login',
        component: WrapLogin,
        exact: true,
        key: 'login',
      },
      {
        component: WrapNotFound
      }
    ]
  }
];
