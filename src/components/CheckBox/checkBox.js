import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from 'antd';

import { onChecked } from '../../action/actionCreator';
import classes from '../CheckBox/checkbox.module.scss';

const CheckBox = () => {
  const dispatch = useDispatch();
  const checkboxData = useSelector((state) => state.checkboxes);

  const checkboxes = checkboxData.map((item) => {
    const { title, label, checked } = item;

    return (
      <li key={label} className={classes.checkbox__checkboxList}>
        <Checkbox key={title} checked={checked} onChange={() => dispatch(onChecked(label))}>
          {title}
        </Checkbox>
      </li>
    );
  });

  return (
    <div className={classes.checkbox}>
      <h3 className={classes.checkbox__title}>КОЛИЧЕСТВО ПЕРЕСАДОК</h3>
      <ul className={classes.checkbox__container}>{checkboxes}</ul>
    </div>
  );
};

export default CheckBox;
