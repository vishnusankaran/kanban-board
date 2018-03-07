import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import List from '../list';
import './index.css';

class Board extends Component {
  constructor(props) {
    super(props);
    console.log('board', props);
    this.state = {
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
    // this.setState(prev => ({ lists: [ ...prev.lists, { id: Math.random(), name: this.state.listInput, cards:[] } ] }),() => {
    //   this.toggleModal();
    // });
  }

  handleInput = (e) => {
    this.setState({ listInput: e.target.value });
  }

  render() {
    const { listInput, showModal } = this.state;
    const { lists = [] } = this.props;

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