import useStyles from '../../hooks/styles';
import { Link } from 'react-router-dom';
import { Header } from '@mantine/core';
import React from 'react';

export default function NavHeader() {
  const { classes } = useStyles();

  return (
    <Header className={classes.h1}>
      <Link
        className={classes.link}
        to='/'
        default
      >
        Home
      </Link>
      <Link
        className={classes.link}
        to='/settings'
      >
        Settings
      </Link>
    </Header>
  );
}
