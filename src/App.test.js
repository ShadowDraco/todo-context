import { render, screen } from '@testing-library/react'
import App from './App'
import SettingsProvider from './Context/Settings'
import AuthProvider from './Context/Auth'

test('renders h1 Header', () => {
  render(
    <AuthProvider>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </AuthProvider>
  )
  const headerElement = screen.getByText(/Home/i)
  expect(headerElement).toBeInTheDocument()
})
