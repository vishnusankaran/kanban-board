import React, { Component, Fragment } from 'react';
import Task from '../task';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import './index.css';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      tasks: props.cards,
      taskInput: ''
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ tasks: newProps.cards });
  }

  handleModal = () => {
    this.toggleModal();
  }

  toggleModal = () => {
    this.setState((prev) => ({ showModal: !prev.showModal }));
  }

  handleInput = (e) => {
    this.setState({ taskInput: e.target.value });
  }

  addTask = () => {debugger;
    this.setState(prev => ({ tasks: [ { content: this.state.taskInput }, ...prev.tasks ] }), () => {
      this.toggleModal();
    });
  }

  render() {
    const { showModal, taskInput, tasks } = this.state;
    const { name } = this.props;

    return (
      <Fragment>
        <section className="list-container">
          <header>
            { name }
          </header>
          <div className="list-content">
            {
              tasks.length > 0 &&
              tasks.map(card => <Task key={ card.id || Math.random() } { ...card } />)
            }
            <RaisedButton fullWidth primary label='+ ADD CARD' onClick={ this.handleModal } />
          </div>
        </section>
        <Dialog
          modal={ true }
          open={ showModal }
          actions={ [ <RaisedButton primary label='ADD' onClick={ this.addTask } /> ] }
          title={ `Add Card for ${ name }` }>
            <TextField
              fullWidth
              value={ taskInput }
              onChange={ this.handleInput } />
        </Dialog>
      </Fragment>
    );
  }
}

export default List;