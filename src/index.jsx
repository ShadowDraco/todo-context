import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

 import {MantineProvider, Text, Button} from '@mantine/core'
import SettingsProvider from './Context/Settings'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
   
    <MantineProvider withGlobalStyles withNormalizeCSS>
     <SettingsProvider>
      <App />
    </SettingsProvider>
    </MantineProvider>
   
  </React.StrictMode>
)
