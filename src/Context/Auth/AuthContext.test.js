import '@testing-library/jest-dom'
import { screen, render, fireEvent } from '@testing-library/react'

import AuthProvider, { AuthContext } from '.'
import Login from '../../components/Auth/Login'

describe('Auth Context', () => {
  it('Provides initial state', () => {
    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {({ isLoggedIn, user }) => {
            return (
              <>
                <p data-testid='isLoggedIn'>{isLoggedIn.toString()}</p>
                <p data-testid='user'>{typeof user}</p>
              </>
            )
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    )

    const loggedIn = screen.getByTestId('isLoggedIn')
    const username = screen.getByTestId('user')

    expect(loggedIn).toHaveTextContent('false')
    expect(username).toHaveTextContent('object')
  })

  it('Provides log in function and state works', () => {
    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {({ isLoggedIn, user, can }) => {
            return (
              <>
                <Login />
                <p data-testid='isLoggedIn'>{isLoggedIn.toString()}</p>

                <p data-testid='capabilities'>{`${user.capabilities}`}</p>
              </>
            )
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    )
    const usernameInput = screen.getByPlaceholderText('username')
    const passwordInput = screen.getByPlaceholderText('password')
    const loginButton = screen.getByText('Login')
    // mocking an event:  change of input
    fireEvent.change(usernameInput, { target: { value: 'admin' } })
    fireEvent.change(passwordInput, { target: { value: 'ADMIN' } })
    fireEvent.click(loginButton)
    expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('true')
    expect(screen.getByTestId('capabilities')).toHaveTextContent(
      'create,update,read,delete'
    )
    /*    const logoutButton = screen.getByText('Log out')
    fireEvent.click(logoutButton)
    expect(screen.getByTestId('isLoggedIn')).toHaveTextContent(false)*/
  })
})
