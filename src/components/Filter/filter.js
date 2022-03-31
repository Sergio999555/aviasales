import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { filterTickets } from '../Store/action/actionCreator';
import classes from '../Filter/filter.module.scss';

const Filter = () => {
  const dispatch = useDispatch();
  const { listButtons, activeFilter } = useSelector(({ listButtons, activeFilter }) => ({ listButtons, activeFilter }));

  const buttons = listButtons.map(({ title, label }) => {
    const isActiveClass = activeFilter === title ? classes['button__filter-active'] : classes['button__filter'];

    return (
      <div key={title}>
        <button type="button" className={isActiveClass} onClick={() => dispatch(filterTickets(title))}>
          {label}
        </button>
      </div>
    );
  });

  return <div className={classes['button__filter-wrapper']}>{buttons}</div>;
};

export default Filter;
