import { render, screen } from '@testing-library/react';
import Header from '.';

test('renders Header links', () => {
  render(<Header />);
  const headerElement = screen.getByText(/Home/i);
  expect(headerElement).toBeInTheDocument();
});
