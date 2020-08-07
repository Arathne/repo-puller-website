import React, {useEffect, useState, useRef} from 'react';
import {Redirect} from 'react-router';
const Api = require('../modules/api.js');
const Log = require('../modules/logger.js');

function File(props) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [css, setCss] = useState('');
  const [downloading, setDownloading] = useState(false);
  const refTag = useRef(null);

  useEffect( () => {
    setName( props.FileName );
  }, [])

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

  const patience = () => {
    Log.append('download already in progress', true)
  }

  return(
    <div>
      <button onClick={!downloading ? (download) : (patience)} className={css}> {name} </button>
      <a href={url} ref={refTag} className='display-none' download={name}> {name} </a>)
    </div>
  );
}
//{url && (<a href={url} download> {name} </a>)}
export default File;
