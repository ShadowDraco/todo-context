import { render, screen } from '@testing-library/react';

import Settings from '.';

import SettingsProvider from '../../Context/Settings';

test('renders Todo list', () => {
  render(
    <SettingsProvider>
      <Settings />
    </SettingsProvider>
  );
  const settingsElement = screen.getByTestId('SETTINGS');
  expect(settingsElement).toBeInTheDocument();
});
