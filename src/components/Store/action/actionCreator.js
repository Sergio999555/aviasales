import { CHECKED, GET_ID, ERROR, GET_TICKETS, GET_MORE, FILTER_TICKETS } from './action';

export const getId = () => (dispatch) => {
  fetch('https://front-test.beta.aviasales.ru/search').then((response) => {
    if (response.status >= 200 && response.status < 300) {
      response.json().then((response) => dispatch({ type: GET_ID, payload: response.searchId }));
    }
    dispatch({ type: ERROR, payload: true });
  });
};

export const getTickets = (id) => (dispatch) => {
  fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${id}`)
    .then((response) => {
      if (!response.ok) {
        dispatch(getTickets(id));
        throw new Error(`Код ошибки ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      dispatch({ type: GET_TICKETS, payload: data });
      if (!data.stop) {
        dispatch(getTickets(id));
      }
    });
};

export const onChecked = (title) => ({
  type: CHECKED,
  payload: title,
});

export const onClickMore = () => ({
  type: GET_MORE,
  payload: 5,
});

export const filterTickets = (value) => ({
  type: FILTER_TICKETS,
  payload: value,
});
