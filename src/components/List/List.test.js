import { render, screen } from '@testing-library/react';

import List from '.';

import SettingsProvider from '../../Context/Settings';

test('renders Todo list', () => {
  render(
    <SettingsProvider>
      <List
        toggleComplete={jest.fn()}
        deleteItem={jest.fn()}
      />
    </SettingsProvider>
  );
  const listElement = screen.getByTestId('TODO-LIST');
  expect(listElement).toBeInTheDocument();
  // pagination renders after first item in list exists
});
