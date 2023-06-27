import './App.css'
import { MantineProvider, Text, Button } from '@mantine/core'
import Todo from './components/Todo/index'

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Todo />
    </MantineProvider>
  )
}
