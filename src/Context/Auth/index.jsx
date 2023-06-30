import React, { useState } from 'react';
import testUsers from './lib/users';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const AuthContext = React.createContext();

export default function AuthProvider({ url, children }) {
  const [apiUrl, setApiUrl] = useState(
    url ? url : `${process.env.REACT_APP_API_URL}`
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  const validateToken = token => {
    try {
      let validUser = jwt_decode(token);

      if (validUser) {
        setIsLoggedIn(true);
        setUser(validUser);
      }
    } catch (err) {
      setError(err);
      setIsLoggedIn(false);
    }
  };

  const login = async (username, password) => {
    try {
      const foundUser = await axios.post(
        `${apiUrl}/signin`,
        {},
        { auth: { username, password } }
      );
      if (foundUser.data.user) {
        if (apiUrl) {
          validateToken(foundUser.data.user.token);
          setIsLoggedIn(true);
        } else {
          setUser(foundUser.data.user);
          setIsLoggedIn(true);
        }
      }
    } catch (err) {
      console.error('ERROR LOGGING IN', err, err.message);
    }
  };

  const signup = async (username, password) => {
    try {
      const createdUser = await axios.post(`${apiUrl}/signup`, {
        username,
        password,
      });

      console.log(createdUser.data);
      if (createdUser.data.user) {
        setIsLoggedIn(true);
        setUser(createdUser.data.user);
      }
    } catch (err) {
      console.error('ERROR SIGNING UP', err);
    }
  };

  const logout = () => {
    setUser({});
    setIsLoggedIn(false);
  };

  const can = capability => {
    return user?.acl?.capabilities.includes(capability);
  };

  const values = {
    isLoggedIn,
    user,
    error,
    login,
    signup,
    logout,
    can,
    validateToken,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
