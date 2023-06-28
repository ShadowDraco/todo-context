import { render, screen } from '@testing-library/react';
import Footer from '.';

test('renders h1 Header', () => {
  render(<Footer />);
  const footerElement = screen.getByText(/©2022 Code Fellows/i);
  expect(footerElement).toBeInTheDocument();
});
