import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import withStyles from '../../withStyle';
import styles from './index.less';

class Header extends Component {

  render() {
    return (
      <div 
        className={ styles.header }
      >
        <Link to="/">首页</Link>
        <Link to="/login">登陆页</Link>
      </div>
    );
  }
}


// export default withStyles(Header, styles);
export default Header;