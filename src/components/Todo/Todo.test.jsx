import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Todo from '.'
import SettingsProvider from '../../Context/Settings'
import AuthProvider from '../../Context/Auth'
import Login from '../Auth/Login'

describe('ToDo Component Tests', () => {
  test('render a header element as expected', () => {
    render(
      <AuthProvider>
        <SettingsProvider>
          <Login />
          <Todo />
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

    let header = screen.getByTestId('todo-header')
    let h1 = screen.getByTestId('todo-h1')

    expect(header).toBeTruthy()
    expect(header).toBeInTheDocument()
    expect(h1).toHaveTextContent('To Do List: 0 items pending')
  })
})
