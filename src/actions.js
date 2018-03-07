import { request } from 'graphql-request';
import store from './store';

const fetchAll = () => {
    let query = `{
      boards {
        _id
        name
        lists {
          _id
          name
          tasks {
            _id
            content
          }
        }
      }
    }`;
    request('http://localhost:3000/graphql', query).then(data => {
      store.dispatch({
        type: 'FETCH_ALL',
        data: data.boards
      });
    });
};

const addBoard = (name) => {
    let mutation = `mutation {
        createBoard(name:"${name}"){
            _id
            name
            lists {
              _id
              name
              tasks {
                _id
                content
              }
            }
        }
    }`;
    request('http://localhost:3000/graphql', mutation).then(data => {
        console.log('action', data);
        store.dispatch({
            type: 'ADD_BOARD',
            data: data.createBoard
        });
    });
};

const deleteBoard = (name) => {
    let mutation = `mutation {
        deleteBoard(name:"${name}"){
          name
        }
    }`;
    request('http://localhost:3000/graphql', mutation).then(data => {
        store.dispatch({
            type: 'DELETE_BOARD',
            data: data.deleteBoard
        });
    });
};

export { fetchAll, addBoard, deleteBoard };