import Koa from 'koa';
import Router from 'koa-router';
import Loadable from 'react-loadable';
import config from '../../config/index';
import loadData from './renderStatic/loadData';
import render from './renderStatic/render';


const app = new Koa();

app.use(require('koa-static')(config.staticPath), {
  // maxage: 60 * 60 * 24
});



const router = new Router();

router.get('*', async (ctx, next) => {
  await loadData(ctx, next);
  await render(ctx, next);
})

app.use(router.routes())
  .use(router.allowedMethods());

Loadable.preloadAll().then(() => {
  app.listen(80, () => {
    console.log('app is starting at 80');
  })
})
