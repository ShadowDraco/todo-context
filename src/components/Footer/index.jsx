import useStyles from '../../hooks/styles';

import React from 'react';

export default function Footer() {
  const { classes } = useStyles();

  return <footer className={classes.footer}>&copy;2022 Code Fellows</footer>;
}
