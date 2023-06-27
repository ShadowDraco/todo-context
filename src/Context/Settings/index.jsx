import React, { useState } from 'react'

export const SettingsContext = React.createContext()

export default function SettingsProvider({ children }) {
  const [title, setTitle] = useState('Home')
  const [defaultValues] = useState({
    difficulty: 4,
  })
  const [sortWord, setSortWord] = useState('difficulty')
  const [activePage, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(3)
  const [hideCompleted, setHideCompleted] = useState(true)
  const [list, setList] = useState([])
  const [currentList, setCurrentList] = useState([])
  const [incomplete, setIncomplete] = useState([])

  const settings = {
    title,
    activePage,
    setPage,
    sortWord,
    setSortWord,
    itemsPerPage,
    setItemsPerPage,
    hideCompleted,
    setHideCompleted,
    list,
    setList,
    currentList,
    setCurrentList,
    incomplete,
    setIncomplete,
    defaultValues,
  }

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  )
}
