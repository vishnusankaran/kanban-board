import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Board from '../board';
import { connect } from 'react-redux';

import './index.css';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <AppBar />
        <Board {...this.props.boards[0]} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    boards = []
  } = state;

  return {
      boards
  };
};

export default connect(mapStateToProps)(App);
