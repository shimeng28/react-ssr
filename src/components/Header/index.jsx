import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '../../withStyle';
import styles from './style.css';

class Header extends Component {

  render() {
    return (
      <div className={ styles.test }>
        <Link to="/">首页</Link>
      </div>
    );
  }
}


export default withStyles(Header, styles);