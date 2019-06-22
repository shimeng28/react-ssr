const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();

const router = new Router();

const mockList = [
  {
    id: 1,
    title: 'aaa',
  },
  {
    id: 2,
    title: 'bbb',
  },
];
router.get('/api/lists.json', async (ctx) => {
  ctx.body = JSON.stringify({
    data: mockList,
    message: 'ok',
    success: true,
  });
});

let login = false;
router.get('/api/login.json', async (ctx) => {
  login = !login;
  ctx.body = JSON.stringify({
    data: login,
    message: 'ok',
    success: true,
  });
});

app.use(router.routes())
  .use(router.allowedMethods());


app.listen(3000, () => {
  console.log('service is starting at 3000');
});
