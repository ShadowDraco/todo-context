import React from 'react'
import App from '../App'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

//* */ mock api calls with MSw
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import SettingsProvider from '../Context/Settings'
import AuthProvider from '../Context/Auth'

const mockData = {
  message: 'hi',
  status: 200,
}

const server = setupServer(
  rest.get('/hi', async (req, res, ctx) => {
    return res(ctx.json(mockData))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
//* */ end MSW setup

it('Renders pagination and item after form submission', () => {
  render(
    <AuthProvider>
      <SettingsProvider>
        <App />
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

  const itemInput = screen.getByTestId('ITEM-INPUT')
  const nameInput = screen.getByTestId('NAME-INPUT')
  const addButton = screen.getByText('Add Item')

  itemInput.value = 'New Task'
  nameInput.value = 'John'
  fireEvent.click(addButton)

  const paginationElement = screen.getByTestId('LIST-PAGINATION')
  const todoItem = screen.getByTestId('LIST-ITEM')
  expect(paginationElement).toBeInTheDocument()
  expect(todoItem).toBeInTheDocument()

  expect(true).toBeTruthy()
})
