import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import styles from './index.less';
// import withStyles from '../../withStyle';

class Login extends Component {
  componentDidMount() {
    // if (!this.props.list.length) {
    //   this.props.getHomeList();
    // }
  }


  render() {
    return (
      <div>
        <Helmet>
          <title>这是登陆页</title>
        </Helmet>
        <h1 className={styles.name}>这是登陆页</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
});

// const ExportLogin = connect(mapStateToProps, mapDispatchToProps)(withStyles(Login, styles));
const ExportLogin = connect(mapStateToProps, mapDispatchToProps)(Login);
// ExportLogin.loadData = (store) => {

// };

export default ExportLogin;