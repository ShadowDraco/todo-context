import { render, screen, fireEvent } from '@testing-library/react'

import Settings from '.'

import SettingsProvider from '../../Context/Settings'
import AuthProvider from '../../Context/Auth'
import Login from '../Auth/Login'

test('renders settings page', () => {
  render(
    <AuthProvider>
      <SettingsProvider>
        <Login />
        <Settings />
      </SettingsProvider>
    </AuthProvider>
  )

  const usernameInput = screen.getByPlaceholderText('username')
  const passwordInput = screen.getByPlaceholderText('password')
  const loginButton = screen.getByText('Login')
  // mocking an event:  change of input
  fireEvent.change(usernameInput, { target: { value: 'admin' } })
  fireEvent.change(passwordInput, { target: { value: 'ADMIN' } })
  fireEvent.click(loginButton)

  const settingsElement = screen.getByTestId('SETTINGS')
  expect(settingsElement).toBeInTheDocument()
})
