import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { getHomeList } from './store/actions';
import styles from './index.less';

// 同构 一套React代码，在服务端执行一次，再在客户端执行一次
class Home extends PureComponent {
  componentDidMount() {
    const { list, getHomeList: getList } = this.props;
    if (!list.length) {
      getList();
    }
  }

  getList() {
    const { list } = this.props;
    return (
      <>
        {
          list.map((item) => (
            <div key={item.id}>
              { item.id }
              ::
              { item.title }
            </div>
          ))
        }
      </>
    );
  }

  render() {
    const { name } = this.props;
    return (
      <div className={styles.test}>
        <Helmet>
          <title>这是首页</title>
        </Helmet>
        <div className={styles.name}>
          欢迎回到首页，
          {name}
        </div>
        {
          this.getList()
        }
      </div>
    );
  }
}

Home.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })),
  getHomeList: PropTypes.func,
  name: PropTypes.string,
};

Home.defaultProps = {
  list: [],
  getHomeList: () => {},
  name: '',
};

const mapStateToProps = (state) => ({
  name: state.home.name,
  list: state.home.newsList,
});

const mapDispatchToProps = (dispatch) => ({
  getHomeList() {
    dispatch(getHomeList());
  },
});

// const ExportHome = connect(mapStateToProps, mapDispatchToProps)(withStyles(Home, styles));
const ExportHome = connect(mapStateToProps, mapDispatchToProps)(Home, styles);
// loadData负责在服务器端渲染之前，把这个路由需要端数据提前加载好
ExportHome.loadData = (store) => store.dispatch(getHomeList());

export default ExportHome;
