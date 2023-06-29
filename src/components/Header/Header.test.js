import { render, screen, fireEvent } from '@testing-library/react'
import NavHeader from '.'
import AuthProvider, { AuthContext } from '../../Context/Auth'

test('renders Header links', () => {
  render(
    <AuthProvider>
      <AuthContext.Consumer>
        {({ isLoggedIn, logout }) => {
          return <NavHeader />
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

  const headerElement = screen.getByText(/Home/i)
  expect(headerElement).toBeInTheDocument()
})
