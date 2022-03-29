import React from 'react';
import { useDispatch } from 'react-redux';

import { onClickMore } from '../../action/actionCreator';
import classes from '../Moretickets/moreTickets.module.scss';

const MoreTickets = () => {
  const dispatch = useDispatch();

  return (
    <button className={classes.button__moreTickets} onClick={() => dispatch(onClickMore())}>
      ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
    </button>
  );
};

export default MoreTickets;
