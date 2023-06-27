import './App.css'
import { MantineProvider, Text, Button } from '@mantine/core'

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Text>Welcome to Mantine!</Text>
      <Button>Click me I do nothing</Button>
    </MantineProvider>
  )
}
