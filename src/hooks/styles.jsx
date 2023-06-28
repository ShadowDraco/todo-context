import { createStyles } from '@mantine/core';

// maybe useful if the stykles are used by more than one component?
const useStyles = createStyles(theme => ({
  h1: {
    backgroundColor: theme.colors.blue[4],
    padding: theme.spacing.md,
    width: '100%',
    margin: theme.spacing.md,
    marginLeft: 0,
    marginTop: 0,
    color: 'white',
  },
  todo: {
    marginLeft: theme.spacing.xl,
    width: '80%',
  },
  todoHeader: {
    width: '100%',
    color: 'white',
    background: 'black',
    padding: 1,
    paddingLeft: 10,
    textAlign: 'left',
  },
  todoForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  todoFormArea: {
    display: 'flex',
    gap: theme.spacing.xl,
    padding: 0,
  },
  todoItems: {
    background: 'beige',
    width: '100%',
  },
  pages: {
    marginTop: 20,
  },
  todoItem: {
    marginTop: '4px',
    boxShadow: '2px 2px 2px gray',
    background: 'white',
  },
  footer: {
    textAlign: 'right',
    width: '80%',
    margin: 'auto',
  },
}));

export default useStyles;
