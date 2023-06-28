import React from 'react';

import { Grid, Text, Button, CloseButton } from '@mantine/core';

import useStyles from '../../hooks/styles';
export default function ListItem({ item, toggleComplete, deleteItem }) {
  const { classes } = useStyles();

  return (
    <Grid
      data-testid='LIST-ITEM'
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
            deleteItem(item.id);
          }}
        />
      </Grid.Col>

      <Grid.Col span={10}>
        <Text>{item.text}</Text>
      </Grid.Col>

      <Grid.Col
        offset={8}
        span={3}
      >
        <Text>
          <small>Difficulty: {item.difficulty}</small>
        </Text>
      </Grid.Col>

      <hr />
    </Grid>
  );
}
