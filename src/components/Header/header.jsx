import React from 'react';

import Logo from '../../img/logo.svg';
import classes from '../Header/header.module.scss';

const Header = () => {
  return (
    <header className={classes.header}>
      <img className={classes['header-logo']} src={Logo} />
    </header>
  );
};

export default Header;
