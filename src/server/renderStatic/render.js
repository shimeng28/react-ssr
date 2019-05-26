import React from 'react';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import fileTools from '../util/fileTools';
import routes from '../../routes';


const getHtml = async ({
  helmetData,
  content,
  injectData
}) => {
  const tempPath = path.resolve(process.cwd(), './static/tmp.html');

  let html = await fileTools.readFile(tempPath);
  html = html.replace(/<!-- meta data -->/g, helmetData);
  html = html.replace(/<!-- ssr content -->/g, content);
  html = html.replace(/<!-- inject data -->/g, injectData);
  return Promise.resolve(html);
}

const render = async (ctx, next) => {
  
    const context = {
      // css: []
    };
    const content = renderToString((
      <Provider store={ ctx.store }>
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
    // 当使用isomorphic-style-loader 可以使用_getCss()获取CSS字符串
    // const cssStr = context.css.length ? context.css.join('\n') : '';
    // <style>${ cssStr }</style>
    const helmetData = `
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
    `;
    const injectData = `
      <script>
        window.context = {
          state: ${JSON.stringify(ctx.store.getState())}
        };
      </script>
    `;
  

    if (context.action === 'REPLACE') {
      ctx.redirect(301, context.url);
    } else  {
      ctx.body = await getHtml({
        content,
        injectData,
        helmetData,
      });;
    }
}

export default render;