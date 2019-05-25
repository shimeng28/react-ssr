import React, { Component } from 'react';

// 同构 一套React代码，在服务端执行一次，再在客户端执行一次
class NotFound extends Component {
  componentWillMount() {
    const { staticContext } = this.props;
    if (staticContext) {
      staticContext.NotFound = true;
    }
  }
  render() {
    return (
      <div>
        404, Sory, page not found
      </div>
    )
  }
}


export default NotFound;