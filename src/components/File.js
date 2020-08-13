/* button that starts downloading file from api when pressed */

import React, {useEffect, useState, useRef} from 'react';
const Api = require('../modules/api.js');
const Log = require('../modules/logger.js');

function File(props) {
  const [repo, setRepo] = useState('');
  const [date, setDate] = useState('2020-08-13');
  const [time, setTime] = useState('4:20');
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [css, setCss] = useState('');
  const [cssFocus, setCssFocus] = useState('');
  const [downloading, setDownloading] = useState(false);
  const refTag = useRef(null);


  /* runs on start
  */
  useEffect( () => {
    let name = props.FileName.split(" ");
    setName( props.FileName );
    setRepo( name[0] );
    if( name.length > 1 )
      setDate( `${name[1]}` );
    if( name.length > 2 )
      setTime( `${name[2].substring(0, 5)}` );
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

  const onFocus = () => {
    setCssFocus('archive-focus');
  }

  const onBlur = () => {
    setCssFocus('');
  }

  /* render
  */
  return(
    <div onFocus={onFocus} onMouseEnter={onFocus} onMouseLeave={onBlur}>
      <button onClick={!downloading ? (download) : (patience)} className={`archive-file-repo ${css} ${cssFocus}`}> {repo} </button>
      <button onClick={!downloading ? (download) : (patience)} className={`archive-file-date ${css} ${cssFocus}`}> {date} </button>
      <button onClick={!downloading ? (download) : (patience)} className={`archive-file-time ${css} ${cssFocus}`}> {time} </button>
      <a href={url} ref={refTag} className='display-none' download={name}> {name} </a>)
    </div>
  );
}

export default File;
