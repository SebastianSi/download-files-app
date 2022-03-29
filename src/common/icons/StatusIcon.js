import React from 'react';
import './StatusIcon.css';

export const StatusIcon = ({color}) => (
  <span className='status-icon' style={{backgroundColor: color || 'grey'}}></span>
);
