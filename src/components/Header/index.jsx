import useStyles from '../../hooks/styles'
import { Button, Container, Header } from '@mantine/core'
import React, { useContext } from 'react'
import { AuthContext } from '../../Context/Auth'
import Login from '../Auth/Login'

export default function NavHeader() {
  const { classes } = useStyles()
  const { isLoggedIn, logout } = useContext(AuthContext)
  return (
    <Container className={classes.HEADER}>
      <Header className={classes.h1}>
        <a className={classes.link} href='/' default>
          Home
        </a>
        <a className={classes.link} href='/settings'>
          Settings
        </a>
      </Header>
      {!isLoggedIn ? (
        <Login />
      ) : (
        <Button onClick={logout} color='red' mt='2%'>
          Log out
        </Button>
      )}
    </Container>
  )
}
