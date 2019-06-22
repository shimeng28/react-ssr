import { matchRoutes } from 'react-router-config';
import { getStore } from 'Store/index';
import routes from '../../routes';

const loadData = async (ctx, next) => {
  // 如果在这里，我们能够拿到异步数据，并填充到store中
  // store里面到底填充什么，我们不知道，我们需要结合当前用户请求地址，和路由做判断
  // 如果用户访问/ 路径，我们就拿home组件到异步数据

  const store = getStore(ctx, next);
  ctx.store = store;


  const matchedRoutes = matchRoutes(routes, ctx.path).map(({ route }) => (!route.component.preload
    ? route.component
    : route.component.preload().then(res => res.default)));

  const loadedActions = await Promise.all(matchedRoutes);
  const promises = loadedActions.map((component) => {
    const promise = new Promise(resolve => (component.loadData
      ? component.loadData(store).then(resolve).catch(resolve) : resolve()));
    return promise;
  });


  await Promise.all(promises);
  next();
};

export default loadData;
