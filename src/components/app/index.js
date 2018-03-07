import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Board from '../board';
import Dashboard from '../dashboard';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAll } from '../../actions';

import './index.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app-container">
          <AppBar />
          <Switch>
            <Route exact path='/' component={() => <Dashboard { ...this.props } />}/>
            <Route path='/board/:id' component={ (props) => {
                console.log('route', props, this.props.boards.filter(({ _id }) => _id === props.match.params.id)[0]);
                return <Board { ...this.props.boards.filter(({ _id }) => _id === props.match.params.id)[0] } />;
              }
            } />
          </Switch>
        </div>
      </BrowserRouter>
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

fetchAll();

export default connect(mapStateToProps)(App);
