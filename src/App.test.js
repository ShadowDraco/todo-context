import { render, screen } from '@testing-library/react';
import App from './App';
import SettingsProvider from './Context/Settings';

test('renders h1 Header', () => {
  render(
    <SettingsProvider>
      <App />
    </SettingsProvider>
  );
  const headerElement = screen.getByText(/Home/i);
  expect(headerElement).toBeInTheDocument();
});
