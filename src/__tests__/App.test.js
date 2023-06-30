import React from 'react';
import App from '../App';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

//* */ mock api calls with MSw
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import SettingsProvider from '../Context/Settings';
import AuthProvider from '../Context/Auth';
import testUsers from '../Context/Auth/lib/users';

const server = setupServer(
  rest.post('-/signin', (req, res, ctx) => {
    return res(ctx.json({ data: { user: testUsers['admin'] } }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
//* */ end MSW setup

it.skip('Login through mock database successful, renders pagination and item after form submission', async () => {
  render(
    <AuthProvider url='-'>
      <SettingsProvider>
        <App url='-' />
      </SettingsProvider>
    </AuthProvider>
  );

  const usernameInput = screen.getByPlaceholderText('username');
  const passwordInput = screen.getByPlaceholderText('password');
  const loginButton = screen.getByText('Login');
  // mocking an event:  change of input
  fireEvent.change(usernameInput, { target: { value: 'admin' } });
  fireEvent.change(passwordInput, { target: { value: 'ADMIN' } });
  fireEvent.click(loginButton);

  const itemInput = await screen.findByTestId('ITEM-INPUT');
  const nameInput = await screen.findByTestId('NAME-INPUT');
  const addButton = await screen.findByText('Add Item');

  itemInput.value = 'New Task';
  nameInput.value = 'John';
  fireEvent.click(addButton);

  const paginationElement = await screen.findByTestId('LIST-PAGINATION');
  const todoItem = await screen.findByTestId('LIST-ITEM');

  expect(paginationElement).toBeInTheDocument();
  expect(todoItem).toBeInTheDocument();
});
