import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// 同构 一套React代码，在服务端执行一次，再在客户端执行一次
class NotFound extends PureComponent {
  // 服务端通过context传递过来的数据
  componentWillMount() {
    const { staticContext } = this.props;
    if (staticContext) {
      staticContext.NotFound = true;
    }
  }

  render() {
    return (
      <div>
        404, 页面走丢了
        <button type="submit"><a href="/">返回首页</a></button>
      </div>
    );
  }
}

NotFound.propTypes = {
  staticContext: PropTypes.shape({}),
};

NotFound.defaultProps = {
  staticContext: null,
};

export default NotFound;
