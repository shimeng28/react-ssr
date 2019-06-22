
react SSR

使用:
  第一次：

  1. git clone git@github.com:shimeng28/react-ssr.git
  2. npm install
  3. npm run postinstall
  4. npm run dev-build
  5. npm run dev
  6. 浏览器打开 http://localhost:9527/

  之后每次需要执行 npm run dev命令即可

目录作用：
  1. /api/ API接口实现目录
  2. /build/ 编译代码目录
  
    1. /build/client/ 客户端代码
    2. /build/dll/ dll文件
    3. /build/server/ 服务端代码
  
  3. /config/ 配置文件目录
  4. /src/ 源代码目录
  5. /webpack/ webpack打包构建文件

技术栈 webpack + React + react-router + Redux + Redux-thunk + axios + koa2

实现原理：
1. react-router-dom作为前后端路由，通过react-router-config支持多级路由
    
2. 利用reactDom.renderToString在服务端生产HTML字符串，在浏览器通过ReactDom.hydrate将React代码重新执行一边
    
3. axios在浏览器和服务端各生成一个实体作为网络请求，通过react-thunk的withExtraArgument方法将请求实体分别传给浏览器端代码和服务端代码。
    
4. 页面数据通过loadData方法在服务端请求数据，生成后注入到HTML中，放到了window.context，作为浏览器端store的默认数据。

5. 浏览器端代码会在ComponentDidMount检查，页面数据不存在时会再次请求。这是因为只有第一次页面请求是SSR渲染，之后在浏览器中的跳转都是单页应用的形式

6. css有两种解决方案，一种是server端打包的时候通过isomorphic-style-loader处理CSS，之后可以通过_getCss方法获取CSS字符串，将css字符串赋值给
   context，之后在node返回给前端的时候注入到html中。另一种是通过MiniCssExtractPlugin将CSS抽离出单独到文件，在服务端将Css以link的形式注入到使用HtmlWebpackPlugin生成的html文件中并返回给前端。
   html模版文件中。
   
7.  使用react-loadable实现按需加载，将分割的代码文件css文件以link， js通过script的方式插入到html中。在浏览器中会通过jsonp的方式加载代码。
    

支持：
1. 支持redux数据流。

2. webpack支持静态资源，字体，图片，支持Less的打包、支持source-map、支持code spliting, 支持js, css按需加载，支持webpack DLL

3. 添加eslint校验，并且添加了git commit hooks


遇到的坑：
MiniCssExtractPlugin 在服务端会报错，document未定义。解决方法： 写一个子类继承MiniCssExtractPlugin，重写 getCssChunkObject方法
  
