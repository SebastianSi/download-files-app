import React, {useState} from 'react';

import {Modal} from '../common/components/Modal';
import { DownloadFilesTable } from '../containers/DownloadFilesTable';

import './DownloadFilesPage.css';

export const DownloadFilesPage = () => {
  const [showAlertBox, setShowAlertBox] = useState(false);
  const [alertBoxData, setAlertBoxData] = useState([]);
  
  const handleAlertBoxClose = () => {
    setShowAlertBox(false);
  };

  const handleDownloadFiles = (files) => {
    setShowAlertBox(true);
    setAlertBoxData(files);
  };

  const allowedFiles = alertBoxData?.filter(file => file.status?.props?.children?.includes('Available'));
  const unallowedFiles = alertBoxData?.filter(file => !file.status?.props?.children?.includes('Available'));

  const alertContent = (files => {
    return files.map((file, i) => 
      <li className='alert-box-file' key={i}>
        <strong className={`alert-box-file-text ${file.status}`}>{file.device} {file.path}</strong>
        {i!== files?.length -1  && <hr style={{width: '80%'}}/>}
      </li>
    )
  });

  return (
    <div >
      <DownloadFilesTable isBlurred={showAlertBox} onDownload={handleDownloadFiles}/>
      <Modal show={showAlertBox} onClose={handleAlertBoxClose}>
        <h2>Downloading</h2>
        <ul className='download-files-list allowed'>
          {alertContent(allowedFiles)}
        </ul>
        <br/>
        {
          Boolean(unallowedFiles?.length) &&
          <>
          <h4>Warning! The following files are not available for download:</h4>
          <ul className='download-files-list'>
            {alertContent(unallowedFiles)}
          </ul>
          <br/>
          </>
        }
      </Modal>
    </div>
  );
};