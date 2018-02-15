import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import List from '../list';
import './index.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [{
        id: "l1",
        name: "List 1",
        cards: [
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
        cards: [
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
      }],
      showModal: false,
      listInput: ''
    }
  }

  handleModal = () => {
    this.toggleModal();
  }

  toggleModal = () => {
    this.setState(prev => ({ showModal: !prev.showModal }));
  }

  addList = () => {
    this.setState(prev => ({ lists: [ ...prev.lists, { id: Math.random(), name: this.state.listInput, cards:[] } ] }),() => {
      this.toggleModal();
    });
  }

  handleInput = (e) => {
    this.setState({ listInput: e.target.value });
  }

  render() {
    const { lists, listInput, showModal } = this.state;

    return (
      <div className="board-container">
        {
          lists.length &&
          lists.map(list => <List key={ list.id } { ...list } />)
        }
        <RaisedButton
          primary
          label='+ ADD LIST'
          onClick={ this.handleModal }
          style={ { width: '300px', display: 'inline-block', verticalAlign:'middle' } } />

        <Dialog
          modal={ true }
          open={ showModal }
          actions={ [ <RaisedButton primary label='ADD' onClick={ this.addList } /> ] }
          title={ 'Add List' }>
            <div>
              <TextField
                fullWidth
                value={ listInput }
                onChange={ this.handleInput } />              
            </div>
        </Dialog>
      </div>
    );
  }
}

export default Board;