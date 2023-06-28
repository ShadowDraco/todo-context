import './App.css';

import Todo from './components/Todo/index';
import { Center } from '@mantine/core';
import Footer from './components/Footer';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavHeader from './components/Header';
import Settings from './components/Settings';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <NavHeader />
        <Center>
          <Routes>
            <Route
              path='/'
              element={<Todo />}
            />
            <Route
              path='/settings'
              element={<Settings />}
            />
          </Routes>
        </Center>
        <Footer />
      </BrowserRouter>
    </>
  );
}
