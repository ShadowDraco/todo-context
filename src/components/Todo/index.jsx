import React, { useContext, useEffect, useState } from 'react';
import useForm from '../../hooks/form';

import { v4 as uuid } from 'uuid';
import useStyles from '../../hooks/styles';
import { SettingsContext } from '../../Context/Settings';
import { Container, Input, Stack, Button, TextInput } from '@mantine/core';
import List from '../List';
import Auth from '../Auth';
import axios from 'axios';

const Todo = ({ url }) => {
  const { classes } = useStyles();
  const { defaultValues, list, setList, incomplete, setIncomplete } =
    useContext(SettingsContext);
  const [apiUrl, setApiUrl] = useState(
    url ? url : `${process.env.REACT_APP_API_URL}`
  );

  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  async function addItem(item) {
    item.complete = false;

    const response = await axios.post(`${apiUrl}/api/v1/todo`, item);

    console.log(response);

    setList([...list, response.data]);
  }

  async function deleteItem(id) {
    const response = await axios.delete(`${apiUrl}/api/v1/todo/${id}`);

    const items = list.filter(item => item._id !== id);

    setList(items);
  }

  const updateWithDataBase = async item => {
    const response = await axios.put(
      `$${apiUrl}/api/v1/todo/${item._id}`,
      item
    );
  };

  function toggleComplete(id) {
    const items = list.map(item => {
      if (item._id === id) {
        // change the item
        item.complete = !item.complete;
        // send the changed item's complete to the server
        updateWithDataBase(item);
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

  useEffect(() => {
    const getTodos = async () => {
      const response = await axios.get(`${apiUrl}/api/v1/todo`);

      setList(response.data.results);
    };

    getTodos();
    // unnessecary dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <Auth capability={'create'}>
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
          </Auth>

          <Container className={classes.todoItems}>
            <Stack className={classes.todoItems}>
              <Auth capability={'read'}>
                <List
                  toggleComplete={toggleComplete}
                  deleteItem={deleteItem}
                />
              </Auth>
            </Stack>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default Todo;
