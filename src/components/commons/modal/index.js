import React, { Component } from 'react';
import './index.css';

class Modal extends Component {
  render() {
    let { title, children, showModal } = this.props;

    return showModal ?
      (
        <div className='modal-container'>
          <section>
            <h2>{ title }</h2>
            { children }
          </section>
        </div>
      ) :
      null;
  }
}

export default Modal;