import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import setupMongooseConnections from './mongoConnection';
import BoardModel from '../schema/board';
import co from 'co';

const schema = buildSchema(`
  type Query {
    boards: [ Board ]
    lists(boardName: String!): [ List ]
  }
  type Board {
    name: String!
    lists: [ List ]
  }
  type List {
    name: String!
    tasks: [ Task ]
  }
  type Task {
    content: String!
  }
  type Mutation {
    createBoard(name: String!): Board
    updateBoardName(name: String!): Board
    deleteBoard(name: String!): Board
    createList(input: CreateList!): List
    updateListName(input: CreateList!): List
    deleteList(input: CreateList!): List
    createTask(input: CreateTask!): Task
    updateTask(input: CreateTask!): Task
    deleteTask(input: CreateTask!): Task
  }
  input CreateList {
    boardName: String!
    listName: String!
  }
  input CreateTask {
    boardName: String!
    listName: String!
    taskContent: String!
  }
`);
const root = {
  boards: () => {
    return new Promise((resolve, reject) => {
      BoardModel.find(
        {},
        (err, boards) => {
          if(err) reject(err);
          resolve(boards);
      });
    });
  },
  lists: ({ boardName: name }) => {
    return new Promise((resolve, reject) => {
      BoardModel.find(
        { name },
        (err, [ board ]) => {
          if(err) reject(err);
          resolve(board.lists);
      });
    });
  },
  createBoard: ({ name }) => {
    return new Promise((resolve, reject) => {
      let newBoard = new BoardModel({ name });
      newBoard.save((err, doc) => {
        if(err) reject(err);
        resolve(doc)
      });
    });
  },
  createList: ({ input:{ boardName, listName } }) => {
    return new Promise((resolve, reject) => {
      BoardModel.findOneAndUpdate(
        { name: boardName },
        { "$push" :{ lists: { name: listName } } },
        { new: true },
        (err, doc) => {
          if(err) reject(err);
          console.log("Updated data ", doc.lists.filter(list => list.name == listName)[0]);
          resolve(doc.lists.filter(list => list.name == listName)[0]);
      });
    });
  },
  createTask: ({ input:{ boardName, listName, taskContent } }) => {
    //TODO
  },
  updateBoardName: ({ name }) => {
    //TODO
  },
  updateListName: ({ input:{ boardName, listName } }) => {
    //TODO
  },
  updateTask: ({ input:{ boardName, listName, taskContent } }) => {
    //TODO
  },
  deleteBoard: ({ name }) => {
    return new Promise((resolve, reject) => {
      BoardModel.findOneAndRemove(
        { name },
        (err, doc) => {
          if(err) reject(err);
          console.log("Deleted data ", doc);
          resolve({name});
      });
    });
  },
  deleteList: ({ input:{ boardName, listName } }) => {
    //TODO
  },
  deleteTask: ({ input:{ boardName, listName, taskContent } }) => {
    //TODO
  }
};
const app = express();

setupMongooseConnections();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');