import './App.css'

import Todo from './components/Todo/index'
import { Center } from '@mantine/core'
import Footer from './components/Footer'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavHeader from './components/Header'
import Settings from './components/Settings'
import Auth from './components/Auth'

export default function App({ test }) {
  return (
    <>
      <BrowserRouter>
        <NavHeader />
        <Auth capability='read'>
          <Center>
            <Routes>
              <Route path='/' element={<Todo />} />
              <Route path='/settings' element={<Settings />} />
            </Routes>
          </Center>
        </Auth>

        <Footer />
      </BrowserRouter>
    </>
  )
}
