import React, { useContext, useEffect } from 'react';
import useForm from '../../hooks/form';

import { v4 as uuid } from 'uuid';
import useStyles from '../../hooks/styles';
import { SettingsContext } from '../../Context/Settings';
import { Container, Input, Stack, Button, TextInput } from '@mantine/core';
import List from '../List';

const Todo = () => {
  const { classes } = useStyles();
  const { defaultValues, list, setList, incomplete, setIncomplete } =
    useContext(SettingsContext);

  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;

    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);

    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }

      return item;
    });

    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily.
    // disable code used to avoid linter warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  return (
    <Container className={classes.todo}>
      <Container>
        <header
          data-testid='todo-header'
          className={classes.todoHeader}
        >
          <h1 data-testid='todo-h1'>To Do List: {incomplete} items pending</h1>
        </header>
        <Container className={classes.todoFormArea}>
          {/* leave the form code inside of the Todo Component */}
          <form
            onSubmit={handleSubmit}
            className={classes.todoForm}
          >
            <h2>Add To Do Item</h2>

            <label>
              <span>To Do Item</span>
              <TextInput
                data-testid='ITEM-INPUT'
                onChange={handleChange}
                name='text'
                type='text'
                placeholder='Item Details'
              />
            </label>

            <label>
              <span>Assigned To</span>
              <TextInput
                data-testid='NAME-INPUT'
                onChange={handleChange}
                name='assignee'
                type='text'
                placeholder='Assignee Name'
              />
            </label>

            <label>
              <span>Difficulty</span>
              <Input
                onChange={handleChange}
                defaultValue={defaultValues.difficulty}
                type='range'
                min={1}
                max={5}
                name='difficulty'
              />
            </label>

            <label>
              <Button type='submit'>Add Item</Button>
            </label>
          </form>

          <Container className={classes.todoItems}>
            <Stack className={classes.todoItems}>
              <List
                toggleComplete={toggleComplete}
                deleteItem={deleteItem}
              />
            </Stack>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default Todo;
