import React, { Component } from 'react';

// 生成高阶组件的函数
// 返回一个高阶组件
export default (DecoratedComponent, styles) => {
  // 返回的这个组件，叫做高阶组件
  return class NewComponent extends Component {
    componentWillMount() {
      const {
        staticContext
      } = this.props;
      if (staticContext) {
        // staticContext.css.push(styles._getCss());
      }
    }

    render() {
      return <DecoratedComponent { ...this.props } />;
    }
  }
};
