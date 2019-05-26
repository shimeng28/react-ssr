
react SSR
技术栈 webpack + React + react-router + Redux + Redux-thunk + axios + koa2
实现：react-router作为前后端路由，
    利用reactDom.renderToString在服务端生产HTML字符串，在浏览器通过ReactDom.hydrate将React代码重新执行一边
    axios在浏览器和服务端各生成一个实体作为网络请求，通过react-thunk的withExtraArgument方法将请求实体分别传给浏览器端代码和服务端代码。
    页面数据通过react-router端loadData方法在服务端请求数据，生成后注入到HTML中，放到了window.context，作为浏览器端store端默认数据。
    浏览器端代码会在ComponentDidMoount检查，页面数据不存在时会再次请求。
    
