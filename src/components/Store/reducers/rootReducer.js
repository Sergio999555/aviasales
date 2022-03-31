import { CHECKED, GET_ID, GET_TICKETS, GET_MORE, FILTER_TICKETS } from '../action/action';

const initialState = {
  checkboxes: [
    { title: 'Все', label: 'all', checked: true },
    { title: 'Без пересадок', label: 'no', checked: true, value: 0 },
    { title: '1 пересадка', label: 'one', checked: true, value: 1 },
    { title: '2 пересадки', label: 'two', checked: true, value: 2 },
    { title: '3 пересадки', label: 'three', checked: true, value: 3 },
  ],
  listButtons: [
    { title: 'cheap', label: 'САМЫЙ ДЕШЕВЫЙ' },
    { title: 'fast', label: 'САМЫЙ БЫСТРЫЙ' },
    { title: 'optimal', label: 'ОПТИМАЛЬНЫЙ' },
  ],
  tickets: { data: [] },
  id: '',
  ticketsCount: 5,
  activeFilter: 'cheap',
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECKED: {
      if (action.payload === 'all') {
        return {
          ...state,
          checkboxes: state.checkboxes.map((item) => ({ ...item, checked: !state.checkboxes[0].checked })),
        };
      }
      const newState = {
        ...state,
        checkboxes: state.checkboxes.map((item) =>
          action.payload === item.label ? { ...item, checked: !item.checked } : item
        ),
      };
      newState.checkboxes[0].checked = newState.checkboxes.slice(1).every((item) => item.checked);
      return newState;
    }

    case GET_ID:
      return {
        ...state,
        id: action.payload,
      };

    case GET_TICKETS:
      return {
        ...state,
        tickets: {
          ...state.tickets,
          stop: action.payload.stop,
          data: [...state.tickets.data, ...action.payload.tickets],
        },
      };

    case GET_MORE:
      return {
        ...state,
        ticketsCount: state.ticketsCount + 5,
      };

    case FILTER_TICKETS:
      return {
        ...state,
        activeFilter: action.payload,
      };

    default:
      return state;
  }
};
