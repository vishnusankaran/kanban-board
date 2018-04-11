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
    case 'UPDATE_BOARD':
      return state;
    case 'DELETE_BOARD':
      return Object.assign({}, state, { boards: [ ...state.boards.filter( board => board.name !== action.data.name ) ] });
    case 'CREATE_LIST':debugger;
      let updatedBoard1 = state.boards.filter( board => board.name === action.data.boardName )[0];
      updatedBoard1.lists.push({ _id: action.data._id, name: action.data.name, tasks: [] });
      return Object.assign({}, state, { boards: [ ...state.boards.filter( board => board.name !== action.data.boardName ), updatedBoard1 ] });
    case 'UPDATE_LIST':
      return state;
    case 'DELETE_LIST':
      let updatedBoard2 = state.boards.filter( board => board.name === action.data.boardName )[0];
      updatedBoard2.lists = updatedBoard2.lists.filter(list => list.name !== action.data.name);
      return Object.assign({}, state, { boards: [ ...state.boards.filter( board => board.name !== action.data.boardName ), updatedBoard2 ] });
    case 'CREATE_TASK':
      let updatedBoard3 = state.boards.filter( board => board.name === action.data.boardName )[0];
      let updatedList1 = updatedBoard3.lists.filter(list => list.name === action.data.listName)[0];
      updatedList1.tasks.push({ _id: action.data._id, content: action.data.content })
      updatedBoard3.lists = [ ...updatedBoard3.lists.filter(list => list.name !== action.data.listName), updatedList1 ];
      return Object.assign({}, state, { boards: [ ...state.boards.filter( board => board.name !== action.data.boardName ), updatedBoard3 ] });
    case 'UPDATE_TASK':
      return state;
    case 'DELETE_TASK':
      let updatedBoard4 = state.boards.filter( board => board.name === action.data.boardName )[0].lists;
      let updatedList2 = updatedBoard4.lists.filter(list => list.name === action.data.listName)[0];
      updatedList2.tasks = updatedList2.tasks.filter(task => task.content !== action.data.content);
      updatedBoard4.lists = [ ...updatedBoard4.lists.filter(list => list.name !== action.data.listName), updatedList2 ];
      return Object.assign({}, state, { boards: [ ...state.boards.filter( board => board.name !== action.data.boardName ), updatedBoard4 ] });  
    default:
      return state;
  }
});

store.subscribe(() =>
  console.log('subscribe', store.getState())
)

export default store;