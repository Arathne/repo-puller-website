/* button that starts downloading file from api when pressed */

import React, {useEffect, useState, useRef} from 'react';
const Api = require('../modules/api.js');
const Log = require('../modules/logger.js');

function File(props) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [css, setCss] = useState('');
  const [downloading, setDownloading] = useState(false);
  const refTag = useRef(null);


  /* runs on start
  */
  useEffect( () => {
    setName( props.FileName );
  }, [])


  /* runs when button is clicked and starts downloading
  */
  const download = () => {
    Log.append('starting download...', true);
    Log.append('may take a min -- please do not leave page');
    setCss('archive-download-active');
    setDownloading(true);

    Api.downloadFile(props.FileName).then( fileURL => {
      setUrl( fileURL );
      if( fileURL === '' ) {
        Log.append('download failed', true)
      } else {
        refTag.current.click();
        Log.append(`download complete - ${name}`, true);
        setDownloading(false);
      }
      setCss('');
    });
  }


  /* runs when download in progress
  */
  const patience = () => {
    Log.append('download in progress... eta: hawaiian time', true)
  }


  /* render
  */
  return(
    <div>
      <button onClick={!downloading ? (download) : (patience)} className={css}> {name} </button>
      <a href={url} ref={refTag} className='display-none' download={name}> {name} </a>)
    </div>
  );
}

export default File;
