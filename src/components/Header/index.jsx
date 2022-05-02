import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.less';

function Header() {
  return (
    <div className={styles.header}>
      <Link to="/">首页</Link>
      <Link to="/login">登陆页</Link>
    </div>
  );
}

export default Header;
