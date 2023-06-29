import React, { useContext, useState, useEffect } from 'react'
import { SettingsContext } from '../../Context/Settings'

import useStyles from '../../hooks/styles'
import {
  Container,
  TextInput,
  Button,
  Stack,
  Switch,
  NumberInput,
  Card,
  Text,
} from '@mantine/core'
import { IconSettings } from '@tabler/icons-react'
import Auth from '../Auth'

export default function Settings() {
  const {
    hideCompleted,
    setHideCompleted,
    itemsPerPage,
    setItemsPerPage,
    sortWord,
    setSortWord,
  } = useContext(SettingsContext)

  const [newItemsPerPage, setNewItemsPerPage] = useState(itemsPerPage)
  const [newHideCompleted, setNewHideCompleted] = useState(hideCompleted)
  const [newSortWord, setNewSortWord] = useState(sortWord)

  useEffect(() => {
    const word = localStorage.getItem('sortWord')
    const items = localStorage.getItem('itemsPerPage')
    const hide = localStorage.getItem('hideCompleted')

    setHideCompleted(hide ? hide : hideCompleted)
    setItemsPerPage(items ? items : itemsPerPage)
    setSortWord(word ? word : sortWord)

    //* Only to be called once per page load */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    setItemsPerPage(newItemsPerPage)
    setHideCompleted(newHideCompleted)
    setSortWord(newSortWord)

    // update local storage on save
    localStorage.setItem('itemsPerPage', newItemsPerPage)
    localStorage.setItem('sortWord', newSortWord)
    localStorage.setItem('hideCompleted', newHideCompleted)
  }

  const changeNewHideCompleted = e => {
    setNewHideCompleted(e.target.checked)
  }

  const changeNewSortWord = e => {
    setNewSortWord(e.target.value)
  }

  const { classes } = useStyles()

  return (
    <Container data-testid='SETTINGS' className={classes.todo}>
      <Container>
        <header data-testid='settings-header' className={classes.todoHeader}>
          <h1 data-testid='settings-h1' className={classes.settingsH1}>
            <IconSettings size='2rem' />
            Manage Settings
          </h1>
        </header>
        <Container className={classes.todoFormArea}>
          {/* leave the form code inside of the Todo Component */}
          <Auth capability={'update'}>
            <form onSubmit={handleSubmit} className={classes.settingsForm}>
              <h2>Update Settings</h2>

              <label className={classes.flex}>
                <Switch
                  data-testid='SWITCH'
                  onChange={changeNewHideCompleted}
                  name='switch'
                />
                <span>Show Completed Todos </span>
              </label>

              <label>
                <span>Items per page</span>
                <NumberInput
                  data-testid='NAME-INPUT'
                  onChange={setNewItemsPerPage}
                  defaultValue={3}
                />
              </label>

              <label>
                <span>Sort key</span>
                <TextInput
                  onChange={changeNewSortWord}
                  placeholder={sortWord}
                  type='text'
                  name='text'
                />
              </label>

              <label>
                <Button type='submit' onClick={handleSubmit}>
                  Show New Settings
                </Button>
              </label>
            </form>
          </Auth>

          <Container className={classes.todoItems}>
            <Auth capability={'read'}>
              <Stack className={classes.todoItems}></Stack>
              <Card>
                <Card shadow='sm' padding='lg' radius='md' withBorder>
                  <h4>Updated Settings</h4>
                  <Text>
                    {!hideCompleted ? "Don't" : ''} Show Completed Todos
                  </Text>
                  <Text mt='0.2em'>Items Per page: {itemsPerPage}</Text>
                  <Text mt='0.2em'>Sort Keyword: {sortWord}</Text>
                </Card>
              </Card>
            </Auth>
          </Container>
        </Container>
      </Container>
    </Container>
  )
}
