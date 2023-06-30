import React, { useContext } from 'react';

import { Grid, Text, CloseButton, Badge } from '@mantine/core';

import useStyles from '../../hooks/styles';
import Auth from '../Auth';
import { AuthContext } from '../../Context/Auth';
export default function ListItem({ item, toggleComplete, deleteItem }) {
  const { classes } = useStyles();
  const { can } = useContext(AuthContext);
  return (
    <Grid
      data-testid='LIST-ITEM'
      grow
      gutter={5}
      key={item._id}
      className={classes.todoItem}
    >
      <Grid.Col span={'auto'}>
        <Badge
          color={item.complete ? 'red' : 'green'}
          onClick={() => (can('update') ? toggleComplete(item._id) : '')}
        >
          {item.complete ? 'Complete' : 'Pending'}
        </Badge>
      </Grid.Col>

      <Grid.Col span={'auto'}>
        <Text>{item.assignee}</Text>
      </Grid.Col>

      <Grid.Col
        span={'auto'}
        offset={6}
        style={{ textAlign: 'right' }}
      >
        <Auth capability={'delete'}>
          <CloseButton
            title='Delete todo'
            size='xl'
            iconSize={20}
            onClick={() => {
              deleteItem(item._id);
            }}
          />
        </Auth>
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
