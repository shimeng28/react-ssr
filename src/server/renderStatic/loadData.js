import { matchRoutes } from 'react-router-config';
import { getStore } from 'Store/index';
import routes from '../../routes';

const loadData = async (ctx, next) => {
  // 如果在这里，我们能够拿到异步数据，并填充到store中
  // store里面到底填充什么，我们不知道，我们需要结合当前用户请求地址，和路由做判断
  // 如果用户访问/ 路径，我们就拿home组件到异步数据

  const store = getStore(ctx, next);
  const matchedRoutes = matchRoutes(routes, ctx.path);
  ctx.store = store;
  const promises = [];
  matchedRoutes.forEach(item => {
    if (item.route.loadData) {
      const promise = new Promise((resolve, reject) => {
        item.route.loadData(store).then(resolve).catch(resolve);
      });
      promises.push(promise);
    }
  });


  await Promise.all(promises);
  next();
}

export default loadData;