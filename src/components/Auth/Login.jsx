import React, { useContext, useState } from 'react';
import { TextInput, Button } from '@mantine/core';
import { AuthContext } from '../../Context/Auth';
import useStyles from '../../hooks/styles';

export default function Login() {
  const { login, signup } = useContext(AuthContext);

  const { classes } = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupOrLogin, setSignupOrLogin] = useState('login');

  const handleSubmit = e => {
    e.preventDefault();
    if (signupOrLogin === 'login') {
      login(username, password);
    } else {
      signup(username, password);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={classes.loginForm}
    >
      <Button
        compact
        onClick={() => {
          signupOrLogin === 'login'
            ? setSignupOrLogin('signup')
            : setSignupOrLogin('login');
        }}
      >
        {signupOrLogin === 'login' ? 'Signup' : 'Login'}
      </Button>
      <label>
        <TextInput
          onChange={e => {
            setUsername(e.target.value);
          }}
          placeholder='username'
        />
      </label>
      <label>
        <TextInput
          onChange={e => {
            setPassword(e.target.value);
          }}
          placeholder='password'
        />
      </label>
      <Button
        type='submit'
        color='dark'
      >
        {signupOrLogin !== 'login' ? 'Signup' : 'Login'}
      </Button>
    </form>
  );
}
