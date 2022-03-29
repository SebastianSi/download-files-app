import React from 'react';
import './Modal.css';

export const Modal = ({show, children, onClose}) => {
  return (
    !show? null :
    <div className='modal'>
        <button className='close-modal' aria-label='Close' onClick={onClose}>
          X
        </button>
      <div className='content'>{children}</div>
    </div>
  );
}