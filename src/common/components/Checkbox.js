import React from 'react';

export const Checkbox = ({ label, value, onChange }) => {
  return (
    <label aria-label={label}>
      <input type='checkbox' checked={value} onChange={onChange}/>
    </label>
  );
};