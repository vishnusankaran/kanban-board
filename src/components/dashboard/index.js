import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { Card, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {grey500} from 'material-ui/styles/colors';
import { Link } from 'react-router-dom';
import { addBoard, deleteBoard } from '../../actions';
import './index.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
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

  addBoard = () => {
    this.toggleModal();
    addBoard(this.state.listInput);
  }

  deleteBoard = (name) => {
    deleteBoard(name);
  }

  handleInput = (e) => {
    this.setState({ listInput: e.target.value });
  }

  render() {
    const { listInput, showModal } = this.state;
    const { boards } = this.props;

    return (
      <div className="board-container">
        {
          boards.length &&
          boards.map(({ name, _id }) => <Card key={ _id } style={ { overflow: 'auto' } } >
                                          <Link to={`/board/${ _id }`}><CardText style={ { width: '80%', float: 'left' } }>{ name }</CardText></Link>
                                          <IconButton style={ { float: 'right', padding: 12 } } onClick={ () => this.deleteBoard(name) } tooltip='Delete Board'>
                                            <FontIcon className="material-icons" color={grey500}>delete</FontIcon>
                                          </IconButton>
                                        </Card> )
        }
        <FloatingActionButton
          style={ { position: 'absolute', right: '50px', bottom: '50px' } }
          onClick={ this.handleModal }>
            <ContentAdd />
        </FloatingActionButton>
        <Dialog
          modal={ true }
          open={ showModal }
          actions={ [ <RaisedButton primary label='ADD' onClick={ this.addBoard } /> ] }
          title={ 'Add Board' }>
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

export default Dashboard;