import React, { useContext, useState } from 'react'
import { TextInput, Button } from '@mantine/core'
import { AuthContext } from '../../Context/Auth'
import useStyles from '../../hooks/styles'

export default function Login() {
  const { login, logout } = useContext(AuthContext)

  const { classes } = useStyles()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    login(username, password)
  }
  return (
    <form onSubmit={handleSubmit} className={classes.loginForm}>
      <label>
        <TextInput
          onChange={e => {
            setUsername(e.target.value)
          }}
          placeholder='username'
        />
      </label>
      <label>
        <TextInput
          onChange={e => {
            setPassword(e.target.value)
          }}
          placeholder='password'
        />
      </label>
      <Button type='submit' color='dark'>
        Login
      </Button>
    </form>
  )
}
