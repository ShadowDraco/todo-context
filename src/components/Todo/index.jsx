import React, { useContext, useEffect, useState } from 'react'
import useForm from '../../hooks/form'

import { v4 as uuid } from 'uuid'
import useStyles from '../../hooks/styles'
import { SettingsContext } from '../../Context/Settings'
import {
  Button,
  CloseButton,
  Container,
  Grid,
  Pagination,
  Stack,
  Text,
} from '@mantine/core'

const Todo = () => {
  const { classes } = useStyles()
  const {
    defaultValues,
    list,
    setList,
    incomplete,
    setIncomplete,
    hideCompleted,
    activePage,
    setPage,
    currentList,
    setCurrentList,
    itemsPerPage,
  } = useContext(SettingsContext)

  // update the current pagination
  useEffect(() => {
    const start = (activePage - 1) * itemsPerPage
    const end = activePage * itemsPerPage
    setCurrentList(list.slice(start, end))

    //* disabled because setActivePage is not a proper dependency */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, activePage, itemsPerPage])

  const { handleChange, handleSubmit } = useForm(addItem, defaultValues)

  function addItem(item) {
    item.id = uuid()
    item.complete = false

    setList([...list, item])
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id)

    setList(items)
  }

  function toggleComplete(id) {
    const items = list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete
      }

      return item
    })

    setList(items)
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length
    setIncomplete(incompleteCount)
    document.title = `To Do List: ${incomplete}`
    // linter will want 'incomplete' added to dependency array unnecessarily.
    // disable code used to avoid linter warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list])

  return (
    <Container className={classes.todo}>
      <Container>
        <header data-testid='todo-header' className={classes.todoHeader}>
          <h1 data-testid='todo-h1'>To Do List: {incomplete} items pending</h1>
        </header>
        <Container className={classes.todoFormArea}>
          {/* leave the form code inside of the Todo Component */}
          <form onSubmit={handleSubmit} className={classes.todoForm}>
            <h2>Add To Do Item</h2>

            <label>
              <span>To Do Item</span>
              <input
                onChange={handleChange}
                name='text'
                type='text'
                placeholder='Item Details'
              />
            </label>

            <label>
              <span>Assigned To</span>
              <input
                onChange={handleChange}
                name='assignee'
                type='text'
                placeholder='Assignee Name'
              />
            </label>

            <label>
              <span>Difficulty</span>
              <input
                onChange={handleChange}
                defaultValue={defaultValues.difficulty}
                type='range'
                min={1}
                max={5}
                name='difficulty'
              />
            </label>

            <label>
              <button type='submit'>Add Item</button>
            </label>
          </form>

          <Container className={classes.todoItems}>
            <Stack className={classes.todoItems}>
              {currentList.map(item =>
                item.complete && hideCompleted ? (
                  ''
                ) : (
                  <Grid
                    grow
                    gutter={5}
                    key={item.id}
                    className={classes.todoItem}
                  >
                    <Grid.Col span={'auto'}>
                      <Button
                        color='green'
                        radius='xl'
                        compact
                        onClick={() => toggleComplete(item.id)}
                      >
                        Pending
                      </Button>
                    </Grid.Col>

                    <Grid.Col span={'auto'}>
                      <Text>{item.assignee}</Text>
                    </Grid.Col>

                    <Grid.Col
                      span={'auto'}
                      offset={6}
                      style={{ textAlign: 'right' }}
                    >
                      <CloseButton
                        title='Delete todo'
                        size='xl'
                        iconSize={20}
                        onClick={() => {
                          deleteItem(item.id)
                        }}
                      />
                    </Grid.Col>

                    <Grid.Col span={10}>
                      <Text>{item.text}</Text>
                    </Grid.Col>

                    <Grid.Col offset={8} span={3}>
                      <Text>
                        <small>Difficulty: {item.difficulty}</small>
                      </Text>
                    </Grid.Col>

                    <hr />
                  </Grid>
                )
              )}
            </Stack>
            <Pagination
              className={classes.pages}
              value={activePage}
              onChange={setPage}
              total={list.length / 3 + 1}
            />
          </Container>
        </Container>
      </Container>
    </Container>
  )
}

export default Todo
