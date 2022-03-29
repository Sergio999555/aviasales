import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { filterTickets } from '../../action/actionCreator';
import classes from '../Filter/filter.module.scss';

const Filter = () => {
  const dispatch = useDispatch();
  const { listButtons } = useSelector(({ listButtons }) => ({ listButtons }));

  const buttons = listButtons.map(({ title, label }) => {
    return (
      <div key={title}>
        <button type="button" className={classes['button__filter']} onClick={() => dispatch(filterTickets(title))}>
          {label}
        </button>
      </div>
    );
  });

  return <div className={classes['button__filter-wrapper']}>{buttons}</div>;
};

export default Filter;
