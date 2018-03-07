import { createStore } from 'redux';

// Create a Redux store holding the state of your app. 
// Its API is { subscribe, dispatch, getState }. 
let store = createStore((state = {}, action) => {
  console.log('reducer', action.data);
  switch (action.type) {
    case 'FETCH_ALL':
      return Object.assign({}, { boards: action.data });
    case 'ADD_BOARD':
      return Object.assign({}, state, { boards: [ ...state.boards, action.data ] });
    case 'DELETE_BOARD':
      return Object.assign({}, state, { boards: [ ...state.boards.filter( board => board.name !== action.data.name ) ] });
    default:
      return state;
  }
});

store.subscribe(() =>
  console.log('subscribe', store.getState())
)

export default store;