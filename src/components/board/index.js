import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import List from '../list';
import { createList, deleteList } from '../../actions';
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
    this.toggleModal();
    createList(this.props.name, this.state.listInput);
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
          lists.length > 0 &&
          lists.map(list => <List boardName={ this.props.name } key={ list._id } { ...list } />)
        }
        <FloatingActionButton
          style={ { position: 'absolute', right: '50px', bottom: '50px' } }
          onClick={ this.handleModal }>
            <ContentAdd />
        </FloatingActionButton>
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