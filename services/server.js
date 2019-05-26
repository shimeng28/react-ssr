const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();

const router = new Router();

router.get('/api/list.json', async (ctx, next) => {
  ctx.body = JSON.stringify({
    data: [
      {
        id: 1,
        title: 'aaa',
     },
     {
       id: 2,
       title: 'bbb'
     }
    ],
    message: 'ok',
    success: true,
  });
});

app.use(router.routes())
  .use(router.allowedMethods());


app.listen(3000, () => {
  console.log('service is starting at 3000');
})