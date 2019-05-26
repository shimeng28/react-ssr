import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { getHomeList } from './store/actions';
import styles from './index.less';
// import withStyles from '../../withStyle';
// 同构 一套React代码，在服务端执行一次，再在客户端执行一次

class Home extends Component {
  componentDidMount() {
    if (!this.props.list.length) {
      this.props.getHomeList();
    }
  }

  getList() {
    const { list } = this.props;
    return list.map((item, index) => <div key={index}>{ item.id }:: { item.title }</div>);
  }

  render() {
    const { name } = this.props;
    return (
      <div className={styles.test}>
        <Helmet>
          <title>这是首页</title>
        </Helmet>
        <div 
          className={styles.name}
        >欢迎回到首页，{name}</div>
        {
          this.getList()
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  name: state.home.name,
  list: state.home.newsList,
});

const mapDispatchToProps = dispatch => ({
  getHomeList() {
    dispatch(getHomeList());
  }
});

// const ExportHome = connect(mapStateToProps, mapDispatchToProps)(withStyles(Home, styles));
const ExportHome = connect(mapStateToProps, mapDispatchToProps)(Home, styles);
ExportHome.loadData = (store) => {
  // 这个函数，负责在服务器端渲染之前，把这个路由需要端数据提前加载好
  return store.dispatch(getHomeList());
};

export default ExportHome;