import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { matchRoutes, renderRoutes } from 'react-router-config';
import routes from '../routes';
import { Provider } from 'react-redux';
import { getStore } from 'Store/index';

export const render = async (ctx, next) => {
  // 如果在这里，我们能够拿到异步数据，并填充到store中
  // store里面到底填充什么，我们不知道，我们需要结合当前用户请求地址，和路由做判断
  // 如果用户访问/ 路径，我们就拿home组件到异步数据

  const store = getStore(ctx, next);
  const matchedRoutes = matchRoutes(routes, ctx.path);

  const promises = [];
  matchedRoutes.forEach(item => {
    if (item.route.loadData) {
      const promise = new Promise((resolve, reject) => {
        item.route.loadData(store).then(resolve).catch(resolve);
      });
      promises.push(promise);
    }
  });


  return Promise.all(promises).then(() => {

    const context = {
      css: []
    };
    const content = renderToString((
      <Provider store={ store }>
        <StaticRouter location={ctx.path} context={context}>
          <div>
            { 
              renderRoutes(routes)
            }
          </div>
        </StaticRouter>
      </Provider>
    ));

    const helmet = Helmet.renderStatic();
    const cssStr = context.css.length ? context.css.join('\n') : '';
    const html = `
      <!DOCTYPE html>
        <html>
          <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            <link rel="shortcut icon" href="/favicon.ico">
            <style>${ cssStr }</style>
          </head>
          <body>
            <div id="root">${content}</div>
            <script>
              window.context = {
                state: ${JSON.stringify(store.getState())}
              };
            </script>
            <script src="/index.js" ></script>
          </body>
        </html>
    `;
    return {
      html,
      context,
    };
  });
}
