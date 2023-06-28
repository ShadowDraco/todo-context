import './App.css';
import { useContext } from 'react';
import useStyles from './hooks/styles';
import { SettingsContext } from './Context/Settings';

import Todo from './components/Todo/index';
import { Center } from '@mantine/core';
import Footer from './components/Footer';

export default function App() {
  const { title } = useContext(SettingsContext);

  const { classes } = useStyles();
  return (
    <>
      <h1 className={classes.h1}>{title}</h1>
      <Center>
        <Todo />
      </Center>
      <Footer />
    </>
  );
}
