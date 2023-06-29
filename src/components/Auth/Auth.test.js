import { render, screen, fireEvent } from '@testing-library/react'

import Auth from '.'

import AuthProvider, { AuthContext } from '../../Context/Auth'
import Login from './Login'

test('renders Auth Component', () => {
  render(
    <AuthProvider>
      <AuthContext.Consumer>
        {({ isLoggedIn, login, logout }) => {
          return (
            <>
              <Login />
              <Auth capability={'read'} />
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

  const authElement = screen.getByTestId('AUTH')
  expect(authElement).toBeInTheDocument()
})
