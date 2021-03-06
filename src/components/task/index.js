import React, { Component } from 'react';
import { Card, CardText } from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { deleteTask } from '../../actions';
import './index.css';

class Task extends Component {
  render() {
    let { content, boardName, listName } = this.props;

    return (
      <Card>
        <CardText>
          <span style={ { padding: '5px 0' } }>{ content }</span>
          <IconMenu
            style={ { float: 'right' } }
            iconButtonElement={<MoreVertIcon />}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem primaryText="Delete" onClick={() => { deleteTask(boardName, listName, content) }} />
          </IconMenu>
        </CardText>
      </Card>
    );
  }
}

export default Task;