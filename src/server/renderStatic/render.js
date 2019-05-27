import React from 'react';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack'
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import config from '../../../config/index';
import fileTools from '../util/fileTools';
import routes from '../../routes';
import stats from '../../../public/react-loadable.json';


const getHtml = async ({
  helmetData,
  content,
  injectData
}) => {
  const tmpPath = config.tmpPath;

  let html = await fileTools.readFile(tmpPath);
  html = html.replace(/<!-- meta data -->/g, helmetData);
  html = html.replace(/<!-- ssr content -->/g, content);
  html = html.replace(/<!-- inject data -->/g, injectData);
  return Promise.resolve(html);
}

const render = async (ctx, next) => {
  
    const context = {
      // css: [],
      modules: [],
    };
    const content = renderToString((
      <Loadable.Capture 
        report={ moduleName => context.modules.push(moduleName)} 
      >
        <Provider store={ ctx.store }>
          <StaticRouter location={ctx.path} context={context}>
            <div>
              { 
                renderRoutes(routes)
              }
            </div>
          </StaticRouter>
        </Provider>
      </Loadable.Capture>
    ));

    const bundles = getBundles(stats, context.modules);
    const cssList = bundles.filter(bundle => /\.css$/.test(bundle.file));
    const jsList = bundles.filter(bundle => /\.js$/.test(bundle.file));
    const helmet = Helmet.renderStatic();
    // 当使用isomorphic-style-loader 可以使用_getCss()获取CSS字符串
    // const cssStr = context.css.length ? context.css.join('\n') : '';
    // <style>${ cssStr }</style>
    const helmetData = `
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${
        cssList.map(bundle => `<link rel="stylesheet" type="text/css" href="/${bundle.file}" />`).join('')
      }
    `;
    const injectData = `
      <script>
        window.context = {
          state: ${JSON.stringify(ctx.store.getState())}
        };
      </script>
      ${
        jsList.map(bundle => `<script src="/${bundle.file}"></script>`).join('')
      }
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