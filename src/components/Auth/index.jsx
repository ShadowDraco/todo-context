import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../Context/Auth'

export default function Auth({ capability, children }) {
  const { isLoggedIn, can } = useContext(AuthContext)

  return (
    <div data-testid='AUTH'>
      {isLoggedIn && can(capability) ? children : ''}
    </div>
  )
}
