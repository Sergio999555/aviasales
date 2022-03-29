import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Spin } from 'antd';

import { getId } from '../../action/actionCreator';
import Header from '../Header/header';
import Checkbox from '../CheckBox/checkBox';
import Filter from '../Filter/filter';
import TicketList from '../TicketList/ticketList';
import MoreTickets from '../Moretickets/moreTickets';
import classes from '../App/app.module.scss';

import 'antd/dist/antd.min.css';

const App = () => {
  const dispatch = useDispatch();
  const { tickets, checkboxes } = useSelector(({ tickets, checkboxes }) => ({
    tickets,
    checkboxes,
  }));

  useEffect(() => {
    dispatch(getId());
  }, []);

  const alertLoading = () => {
    if (!tickets.stop) {
      return (
        <>
          <Spin className={classes.spin} size="large" />
          <Alert message="Билеты загружаются..." type="info" className={classes.alert} />
        </>
      );
    }
    return null;
  };

  const notFound = () => {
    if (checkboxes.every((element) => !element.checked)) {
      return (
        <Alert message="Рейсов, подходящих под заданные фильтры, не найдено" type="error" className={classes.alert} />
      );
    }
    return null;
  };

  return (
    <div className={classes.container}>
      <Header />
      <section className={classes.main}>
        <Checkbox />
        <div>
          <Filter />
          {alertLoading()}
          <TicketList />
          {notFound()}
          <MoreTickets />
        </div>
      </section>
    </div>
  );
};

export default App;
