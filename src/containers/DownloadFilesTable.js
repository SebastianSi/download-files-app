import React, {useState, useEffect} from 'react';

import { getFiles } from '../mockApi/api';
import { Table } from '../common/components/Table';
import { DownloadIcon } from '../common/icons/DownloadIcon';
import { StatusIcon } from '../common/icons/StatusIcon';

import './DownloadFilesTable.css';
import { capitalizeFirstLetter } from '../utils/utils';

const formatFilesStatus = (files) => files.map(file => {
  return {
    ...file,
    status: <td key={`${file.device}-${file.path}`}>{file.status === 'available' && <StatusIcon color={'green'}/>} {capitalizeFirstLetter(file.status)}</td>
  }
});

export const DownloadFilesTable = ({onDownload, isBlurred}) => {

  const [files, setFiles] = useState([]);

  useEffect(()=> {
    const setTableFiles = async () => {
      setFiles(await getFiles());
    };
    setTableFiles()
      .catch(console.error);
  }, []);

  const handleDownload = (data) => {
    onDownload(data);
  };
  const submitComponent = (
    <>
      <DownloadIcon title={'Download selected files'}/>
      <span className='download-selected-text'>Download Selected</span>
    </>
  );
  const decoratedFiles = formatFilesStatus(files);

  return (
    <div className={`table-container ${isBlurred? 'blurred': ''}`}>
    <Table
      tableDescription={'Files Table'}
      submitComponent={submitComponent}
      onSubmit={handleDownload}
      rowsData={decoratedFiles}
      columnsBasedOnRowData
    />
    </div>
  );
};
