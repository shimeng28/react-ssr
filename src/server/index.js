import Koa from 'koa';
import { render } from './util';
import path from 'path';
import Router from 'koa-router';
// import proxy from 'express-http-proxy';

const app = new Koa();
app.use(require('koa-static')(path.resolve(process.cwd(), './public')), {
  maxage: 60 * 60 * 24
});

const router = new Router();

router.get('*', async (ctx, next) => {
  const { context, html } = await render(ctx, next);
  if (context.action === 'REPLACE') {
    ctx.redirect(301, context.url);
  } else if (context.NotFound) {
    ctx.body = html;
  } else {
    ctx.body = html;
  } 
})

app.use(router.routes())
  .use(router.allowedMethods());

app.listen(80, () => {
  console.log('app is starting at 80');
})
