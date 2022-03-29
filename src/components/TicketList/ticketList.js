import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getTickets } from '../../action/actionCreator';
import Ticket from '../Ticket/ticket';
import classes from '../TicketList/ticketList.module.scss';

const TicketList = () => {
  const dispatch = useDispatch();
  const { tickets, id, ticketsCount, activeFilter, checkboxes } = useSelector(
    ({ tickets, id, ticketsCount, activeFilter, checkboxes }) => ({
      tickets,
      id,
      ticketsCount,
      activeFilter,
      checkboxes,
    })
  );

  useEffect(() => {
    if (id) dispatch(getTickets(id));
  }, [id]);

  const ticketsData = (data) =>
    data.map((item) => ({
      price: item.price,
      carrier: item.carrier,
      departure: [item.segments[0].origin, item.segments[0].destination],
      departureTransfers: item.segments[0].stops,
      departureDuration: item.segments[0].duration,
      arrival: [item.segments[1].origin, item.segments[1].destination],
      arrivalTransfers: item.segments[1].stops,
      departureTime: item.segments[0].date,
      arrivalTime: item.segments[1].date,
      arrivalDuration: item.segments[1].duration,
    }));

  const ticketsSort = (tickets, filter) => {
    if (filter === 'cheap') return tickets.sort((prev, next) => prev.price - next.price);

    if (filter === 'fast') {
      return tickets.sort(
        (prev, next) =>
          prev.segments[0].duration +
          prev.segments[1].duration -
          (next.segments[0].duration + next.segments[1].duration)
      );
    }

    if (filter === 'optimal') {
      return tickets.sort(
        (prev, next) =>
          prev.price +
          prev.segments[0].duration +
          prev.segments[1].duration -
          (next.price + next.segments[0].duration + next.segments[1].duration)
      );
    }
    return tickets;
  };

  const checkboxFilter = (data, checkBoxes) => {
    const checked = checkBoxes.filter((item) => item.checked);
    const all = checked.some((item) => item.label === 'all');

    if (all) return data;

    return data.filter((ticket) => {
      const stops = ticket.segments[0].stops.length + ticket.segments[1].stops.length;
      return checked.some((check) => stops === check.value);
    });
  };
  let num = 1;

  const result = ticketsData(ticketsSort(checkboxFilter(tickets.data, checkboxes), activeFilter)).map((item) => (
    <Ticket
      key={num++}
      price={item.price}
      carrier={item.carrier}
      departure={item.departure}
      departureTransfers={item.departureTransfers}
      arrival={item.arrival}
      arrivalTransfers={item.arrivalTransfers}
      departureTime={item.departureTime}
      arrivalTime={item.arrivalTime}
      departureDuration={item.departureDuration}
      arrivalDuration={item.arrivalDuration}
    />
  ));
  return <div className={classes.ticketList}>{result.slice(0, ticketsCount)}</div>;
};
export default TicketList;
