import React from 'react';
import App from '../App';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

//* */ mock api calls with MSw
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import SettingsProvider from '../Context/Settings';

const mockData = {
  message: 'hi',
  status: 200,
};

const server = setupServer(
  rest.get('/hi', async (req, res, ctx) => {
    return res(ctx.json(mockData));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
//* */ end MSW setup

it('Renders pagination and item after form submission', () => {
  render(
    <SettingsProvider>
      <App />
    </SettingsProvider>
  );
  const itemInput = screen.getByTestId('ITEM-INPUT');
  const nameInput = screen.getByTestId('NAME-INPUT');
  const addButton = screen.getByText('Add Item');

  itemInput.value = 'New Task';
  nameInput.value = 'John';
  fireEvent.click(addButton);

  const paginationElement = screen.getByTestId('LIST-PAGINATION');
  const todoItem = screen.getByTestId('LIST-ITEM');
  expect(paginationElement).toBeInTheDocument();
  expect(todoItem).toBeInTheDocument();

  expect(true).toBeTruthy();
});
