import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import setupMongooseConnections from './mongoConnection';
import BoardModel from '../schema/board';

const schema = buildSchema(`
  type Query {
    boards: [ Board ]
    lists(boardName: String!): [ List ]
  }
  type Board {
    _id: String
    name: String!
    lists: [ List ]
  }
  type List {
    _id: String
    name: String!
    tasks: [ Task ]
  }
  type Task {
    _id: String
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
      newBoard.save((err, board) => {
        if(err) reject(err);
        console.log("Created Board : ", board);
        resolve(board)
      });
    });
  },
  createList: ({ input:{ boardName, listName } }) => {
    return new Promise((resolve, reject) => {
      BoardModel.findOneAndUpdate(
        { name: boardName },
        { "$push" :{ lists: { name: listName } } },
        { new: true },
        (err, { lists }) => {
          if(err) reject(err);
          console.log("Created List : ", lists.filter(list => list.name == listName)[0]);
          resolve(lists.filter(list => list.name == listName)[0]);
      });
    });
  },
  createTask: ({ input:{ boardName, listName, taskContent } }) => {
    return new Promise((resolve, reject) => {
      BoardModel.findOne(
        { name: boardName },
        (err, board) => {
          if(err) reject(err);
          board.lists.filter(({ name }) => name == listName)[0].tasks.push({ content: taskContent });
          board.save((err, doc) => {
            if(err) reject(err);
            console.log("Created Task : ",doc.lists.filter(({ name }) => name == listName)[0].tasks.filter(task => task.content == taskContent)[0]);
            resolve(doc.lists.filter(({ name }) => name == listName)[0].tasks.filter(task => task.content == taskContent)[0]);
          });
      });
    });
  },
  deleteBoard: ({ name }) => {
    return new Promise((resolve, reject) => {
      BoardModel.findOneAndRemove(
        { name },
        (err, doc) => {
          if(err) reject(err);
          console.log("Deleted Board : ", doc);
          resolve({name});
      });
    });
  },
  deleteList: ({ input:{ boardName, listName } }) => {
    return new Promise((resolve, reject) => {
      BoardModel.findOneAndUpdate(
        { name:boardName },
        { $pull: { lists: { name: listName } } },
        { new: false },
        (err, { lists }) => {
          if(err) reject(err);
          console.log("Deleted List : ", lists.filter(({ name }) => name == listName )[0]);
          resolve(lists.filter(({ name }) => name == listName )[0]);
      });
    });
  },
  deleteTask: ({ input:{ boardName, listName, taskContent } }) => {
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
};
const app = express();

setupMongooseConnections();
// app.use("/graphql", function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//   if (req.method === 'OPTIONS') {
//     res.status(200);
//   } else {
//     next();
//   }
// });
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');