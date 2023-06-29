import React, { useState } from 'react'
import testUsers from './lib/users'
import jwt_decode from 'jwt-decode'

export const AuthContext = React.createContext()

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [error, setError] = useState(null)

  const validateToken = token => {
    try {
      let validUser = jwt_decode(token)
    
      if (validUser) {
        setIsLoggedIn(true)
        setUser(validUser)
       
      }
    } catch (err) {
      setError(err)
      setIsLoggedIn(false)
      
    }
  }

  const login = (username, password) => {
    // get token from mock 'database' using user, pass

    let user = testUsers[username]

    if (user && password === user.password) {
      try {
        validateToken(user.token)
     
      } catch (err) {
        console.error('ERROR VALIDATING', err)
      }
    }
  }

  const logout = () => {
    setUser({})
    setIsLoggedIn(false)
  }

  const can = capability => {
    return user?.capabilities?.includes(capability)
  }

  const values = {
    isLoggedIn,
    user,
    error,
    login,
    logout,
    can,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
