import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { getLogin } from './store/actions';
import styles from './index.less';

class Login extends PureComponent {
  componentDidMount() {
    const { isLogin, getLoginStatus } = this.props;
    if (typeof isLogin === 'undefined') {
      getLoginStatus();
    }
  }

  render() {
    const { isLogin } = this.props;
    return (
      <div>
        <Helmet>
          <title>这是登陆页</title>
        </Helmet>
        <h1 className={styles.name}>这是登陆页</h1>
        <p className={styles.status}>
          {
            isLogin
              ? '您已登陆'
              : '您未登陆'
          }
        </p>
      </div>
    );
  }
}

Login.propTypes = {
  isLogin: PropTypes.bool,
  getLoginStatus: PropTypes.func,
};

Login.defaultProps = {
  isLogin: undefined,
  getLoginStatus: () => {},
};

const mapStateToProps = (state) => ({
  isLogin: state.login.isLogin,
});

const mapDispatchToProps = (dispatch) => ({
  getLoginStatus() {
    dispatch(getLogin());
  },
});

const ExportLogin = connect(mapStateToProps, mapDispatchToProps)(Login);
ExportLogin.loadData = (store) => store.dispatch(getLogin());

export default ExportLogin;
