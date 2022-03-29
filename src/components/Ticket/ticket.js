import React from 'react';
import { format } from 'date-fns';

import classes from '../Ticket/ticket.module.scss';

const Ticket = ({
  price,
  carrier,
  departure,
  departureTransfers,
  arrival,
  arrivalTransfers,
  departureDuration,
  arrivalDuration,
  departureTime,
  arrivalTime,
}) => {
  const getTimeFromMins = (mins) => {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    return `${hours}ч ${minutes < 10 ? `0${minutes}` : minutes}м`;
  };

  return (
    <li className={classes['ticket__container']}>
      <div className={classes['ticket__header']}>
        <span className={classes['ticket__price']}>{price} ₽</span>
        <img src={`//pics.avs.io/99/36/${carrier}.png`} alt="logo" className={classes['ticket__logo']} />
      </div>

      <div className={classes['ticket__content']}>
        <div className={classes['ticket__column']}>
          <span className={classes['ticket__title']}>{departure.join(' - ')}</span>
          <span className={classes['ticket__routeTime']}>
            {format(new Date(departureTime), 'HH:mm')} -{' '}
            {format(new Date(new Date(departureTime).getTime() + departureDuration * 1000 * 60), 'HH:mm')}
          </span>
          <span className={classes['ticket__title']}>{arrival.join(' - ')}</span>
          <span className={classes['ticket__routeTime']}>
            {format(new Date(arrivalTime), 'HH:mm')} -{' '}
            {format(new Date(new Date(arrivalTime).getTime() + arrivalDuration * 1000 * 60), 'HH:mm')}
          </span>
        </div>

        <div className={classes['ticket__column']}>
          <span className={classes['ticket__title']}>В ПУТИ</span>
          <span className={classes['ticket__lengthTime']}>{getTimeFromMins(departureDuration)}</span>
          <span className={classes['ticket__title']}>В ПУТИ</span>
          <span className={classes['ticket__lengthTime']}>{getTimeFromMins(arrivalDuration)}</span>
        </div>

        <div className={classes['ticket__column']}>
          <span className={classes['ticket__title']}>
            {departureTransfers.length}{' '}
            {departureTransfers.length > 1 ? 'ПЕРЕСАДКИ' : departureTransfers.length === 0 ? 'ПЕРЕСАДОК' : 'ПЕРЕСАДКА'}
          </span>
          <span className={classes['ticket__lengthTime']}>
            {departureTransfers.length ? departureTransfers.join(', ') : '-'}
          </span>
          <span className={classes['ticket__title']}>
            {arrivalTransfers.length}
            {arrivalTransfers.length > 1 ? ' ПЕРЕСАДКИ' : arrivalTransfers.length === 0 ? ' ПЕРЕСАДОК' : ' ПЕРЕСАДКА'}
          </span>
          <span className={classes['ticket__lengthTime']}>
            {arrivalTransfers.length ? arrivalTransfers.join(', ') : '-'}
          </span>
        </div>
      </div>
    </li>
  );
};

export default Ticket;
