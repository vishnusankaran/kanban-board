import React, { Component } from 'react';
import './index.css';

class Button extends Component {
  render() {
    let { label, onClick, style } = this.props;

    return <button className='cta' style={ style } onClick={ onClick }>{ label }</button>;
  }
}

export default Button;