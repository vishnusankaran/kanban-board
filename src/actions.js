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

const createBoard = (name) => {
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

const createList = (boardName, listName) => {
    let mutation = `mutation {
        createList(input: {boardName:"${boardName}", listName:"${listName}"}){
            _id
            name
            tasks {
                content
            }
        }
    }`;
    request('http://localhost:3000/graphql', mutation).then(data => {
        store.dispatch({
            type: 'CREATE_LIST',
            data: { ...data.createList, boardName }
        });
    });
};

const deleteList = (boardName, listName) => {
    let mutation = `mutation {
        deleteList(input: {boardName:"${boardName}", listName:"${listName}"}){
            _id
            name
        }
    }`;
    request('http://localhost:3000/graphql', mutation).then(data => {
        store.dispatch({
            type: 'DELETE_LIST',
            data: { ...data.deleteList, boardName }
        });
    });
};

const createTask = (boardName, listName, taskContent) => {
    let mutation = `mutation {
        createTask(input: {boardName:"${boardName}", listName:"${listName}", taskContent:"${taskContent}"}){
            _id
            content
        }
    }`;
    request('http://localhost:3000/graphql', mutation).then(data => {
        store.dispatch({
            type: 'CREATE_TASK',
            data: { ...data.createTask, boardName, listName }
        });
    });
};

const deleteTask = (boardName, listName, taskContent) => {
    let mutation = `mutation {
        deleteTask(input: {boardName:"${boardName}", listName:"${listName}", taskContent:"${taskContent}"}){
            _id
            content
        }
    }`;
    request('http://localhost:3000/graphql', mutation).then(data => {
        store.dispatch({
            type: 'DELETE_TASK',
            data: { ...data.deleteTask, boardName, listName }
        });
    });
};

export { fetchAll, createBoard, deleteBoard, createList, deleteList, createTask, deleteTask };