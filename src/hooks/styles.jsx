import { createStyles } from '@mantine/core'

// maybe useful if the stykles are used by more than one component?
const useStyles = createStyles(theme => ({
  HEADER: {
    backgroundColor: theme.colors.blue[4],
    display: 'flex',
    justifyContent: 'space-between',
  },
  loginForm: {
    display: 'flex',
    gap: 10,
    justifyContent: 'right',
    alignItems: 'center',
  },
  h1: {
    backgroundColor: theme.colors.blue[4],
    padding: theme.spacing.md,
    margin: theme.spacing.md,
    marginLeft: 0,
    marginTop: 0,
    color: 'white',
    paddingLeft: '0.5em',
    display: 'flex',
    fontSize: '1.5em',
    gap: '20px',
  },
  settingsH1: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5em',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
  todo: {
    width: '90%',
  },
  todoHeader: {
    width: '100%',
    color: 'white',
    background: 'rgba(40, 40, 40)',
    padding: 1,
    textAlign: 'left',
    paddingLeft: 10,
  },
  flex: {
    display: 'flex',
    gap: '0.3em',
    alignItems: 'center',
  },
  todoForm: {
    display: 'flex',
    flexDirection: 'column',
    width: '45%',
  },
  settingsForm: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    gap: '0.5em',
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
}))

export default useStyles
