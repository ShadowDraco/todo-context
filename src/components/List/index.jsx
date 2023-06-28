import React, { useContext, useEffect } from 'react';

import { Pagination } from '@mantine/core';
import useStyles from '../../hooks/styles';
import { SettingsContext } from '../../Context/Settings';
import ListItem from './ListItem';

export default function List({ toggleComplete, deleteItem }) {
  const {
    activePage,
    list,
    hideCompleted,
    setPage,
    currentList,
    itemsPerPage,
    setCurrentList,
  } = useContext(SettingsContext);

  const { classes } = useStyles();

  // update the current pagination
  useEffect(() => {
    const start = (activePage - 1) * itemsPerPage;
    const end = activePage * itemsPerPage;
    setCurrentList(list.slice(start, end));

    //* disabled because setActivePage is not a proper dependency */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, activePage, itemsPerPage]);

  return (
    <>
      <div data-testid='TODO-LIST'>
        {currentList.map((item, index) => {
          return item.complete && hideCompleted ? (
            ''
          ) : (
            <ListItem
              key={`${index} ${item.id}`}
              item={item}
              toggleComplete={toggleComplete}
              deleteItem={deleteItem}
            />
          );
        })}
      </div>
      <Pagination
        data-testid='LIST-PAGINATION'
        className={classes.pages}
        value={activePage}
        onChange={setPage}
        total={Math.ceil(list.length / 3)}
      />
    </>
  );
}
