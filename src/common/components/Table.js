import React, {useState, useEffect} from 'react';

import {capitalizeFirstLetter} from '../../utils/utils'
import { CHECKBOX_STATES } from '../../constants';

import { Checkbox } from './Checkbox';
import { IndeterminateCheckbox } from './IndeterminateCheckbox';
import './Table.css';

const toggleCheckAllRows = (rowsData, isChecked) => {
  const newTableState = {};
  rowsData?.forEach(rowData => {
    newTableState[`${rowData.device}${rowData.path}`] = {...rowData, isChecked}
  })
  return newTableState;
}

export const Table = ({
  submitComponent, 
  tableDescription, 
  onSubmit, 
  rowsData, 
  columnsBasedOnRowData, 
  customColumns = []
}) => {
  const [tableState, setTableState] = useState({});
  const [numberOfCheckedItems, setNumberOfCheckedItems] = useState(0);
  const [selectAllChecked, setSelectAllChecked] = useState(CHECKBOX_STATES.Empty);

  const handleMainCheckboxChange = () => {
    let updatedChecked;
    if (selectAllChecked === CHECKBOX_STATES.Checked) {
      updatedChecked = CHECKBOX_STATES.Empty;
      setTableState(toggleCheckAllRows(Object.values(tableState), false));
      setNumberOfCheckedItems(0);
    } else if (selectAllChecked === CHECKBOX_STATES.Empty) {
      updatedChecked = CHECKBOX_STATES.Checked;
      setTableState(toggleCheckAllRows(Object.values(tableState), true));
      setNumberOfCheckedItems(rowsData.length);
    } else if (selectAllChecked === CHECKBOX_STATES.Indeterminate) {
      updatedChecked = CHECKBOX_STATES.Checked;
      setTableState(toggleCheckAllRows(Object.values(tableState), true));
      setNumberOfCheckedItems(rowsData.length);
    }
    setSelectAllChecked(updatedChecked);
  };

  const onSubmitData = () => {
    onSubmit(Object.values(tableState)?.filter(row => row.isChecked));
    setNumberOfCheckedItems(0);
  };

  useEffect(()=> {
    setTableState(toggleCheckAllRows(rowsData, false));
  }, [rowsData])

  useEffect(()=> {
    if (numberOfCheckedItems === 0) {
      setSelectAllChecked(CHECKBOX_STATES.Empty);
    } else if (numberOfCheckedItems === rowsData?.length) {
      setSelectAllChecked(CHECKBOX_STATES.Checked);
    } else {
      setSelectAllChecked(CHECKBOX_STATES.Indeterminate);
    }
  }, [numberOfCheckedItems, rowsData?.length])

  const columns = (columnsBasedOnRowData && rowsData?.length)? Object.keys(rowsData[0]) : customColumns;
  const displayedColumns = columns?.map((column, i) => 
    <th scope='col' key={i}>{capitalizeFirstLetter(column)}</th>
  );
  const displayedRows = Object.entries(tableState).map(
    ([key, value]) => {
      const rowFields = Object.values(value);
      const row = rowFields?.reduce((acc, field, i) => {
        const node = React.isValidElement(field) ? field : <td key={field}>{field}</td>;
        node && acc.push(node);
        return acc;
      }, []);
      return (
        <tr key={key} className={`table-row ${value.isChecked? 'selected' : ''}`}>
        <th scope='row'>
          <Checkbox 
            value={value.isChecked}
            onChange={(e)=>{
              setTableState({
                ...tableState,
                [`${key}`]: {...value, isChecked: e.target.checked}
              })
              setNumberOfCheckedItems(e.target.checked ? numberOfCheckedItems + 1: numberOfCheckedItems - 1);
            }}
            label={value.name}
          />
        </th>
        {row}
        </tr>
    )}
  );

  return (
    <>
      <div className='table-header-actions'>
        <IndeterminateCheckbox
          label={numberOfCheckedItems? `Selected ${numberOfCheckedItems}` : 'None Selected'}
          value={selectAllChecked}
          onChange={handleMainCheckboxChange}
        />
        <div className='table-submit-component' onClick={onSubmitData}>{submitComponent}</div>
      </div>
      <table aria-label={tableDescription || 'table'}>
        <thead>
          <tr>
            <th scope='col'></th>
            {displayedColumns}
          </tr>
        </thead>
        <tbody>
          {displayedRows}  
        </tbody>
        <tfoot></tfoot>
      </table>
    </>
  );
};