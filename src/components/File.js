import React, {useEffect, useState, useRef} from 'react';
import {Redirect} from 'react-router';
const Api = require('../modules/api.js');
const Log = require('../modules/logger.js');

function File(props) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [css, setCss] = useState('');
  const refTag = useRef(null);

  useEffect( () => {
    setName( props.FileName );
  }, [])

  const download = () => {
    Log.append('starting download...', true);
    Log.append('may take a min -- please do not leave page');
    setCss('archive-download-active');

    Api.downloadFile(props.FileName).then( fileURL => {
      setUrl( fileURL );
      if( fileURL === '' ) {
        Log.append('download failed', true)
      } else {
        refTag.current.click();
        Log.append(`download complete - ${name}`, true);
      }
      setCss('');
    });
  }

  return(
    <div>
      <button onClick={download} className={css}> {name} </button>
      <a href={url} ref={refTag} className='display-none' download={name}> {name} </a>)
    </div>
  );
}
//{url && (<a href={url} download> {name} </a>)}
export default File;
