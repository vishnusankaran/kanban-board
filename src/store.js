import { createStore } from 'redux'

// Create a Redux store holding the state of your app. 
// Its API is { subscribe, dispatch, getState }. 
let store = createStore((state = 0, action) => {
  return {
    boards: [{
      name: 'Board1',
      lists: [{
        id: "l1",
        name: "List 1",
        tasks: [
          {
            id: "c1",
            content: "Lorem Ipsum Dolor Sit Amet"
          },
          {
            id: "c2",
            content: "Ipsum Dolor Lorem Sit Amet"
          },
          {
            id: "c3",
            content: "Dolor Lorem Sit Ipsum Amet"
          }
        ]
      },
      {
        id: "l2",
        name: "List 2",
        tasks: [
          {
            id: "c4",
            content: "Ipsum Dolor Lorem Sit Amet"
          },
          {
            id: "c5",
            content: "Lorem Ipsum Dolor Sit Amet"
          },
          {
            id: "c6",
            content: "Dolor Lorem Sit Ipsum Amet"
          }
        ]
      }]
    }]
  }
})
 
store.subscribe(() =>
  console.log(store.getState())
)
 
store.dispatch({ type: 'UPDATE' })

export default store;