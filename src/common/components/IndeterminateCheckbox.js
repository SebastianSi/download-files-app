import React, {useEffect, useRef} from 'react';

import { CHECKBOX_STATES } from '../../constants';

export const IndeterminateCheckbox = ({ label, value, onChange }) => {
  const checkboxRef = useRef();

  useEffect(() => {
    if (value === CHECKBOX_STATES.Checked) {
      checkboxRef.current.checked = true;
      checkboxRef.current.indeterminate = false;
    } else if (value === CHECKBOX_STATES.Empty) {
      checkboxRef.current.checked = false;
      checkboxRef.current.indeterminate = false;
    } else if (value === CHECKBOX_STATES.Indeterminate) {
      checkboxRef.current.checked = false;
      checkboxRef.current.indeterminate = true;
    }
  }, [value]);

  return (
    <label>
      <input id='main-checkbox' ref={checkboxRef} type='checkbox' onChange={onChange} />
      {label}
    </label>
  );
};