import React, {useEffect, useState, useRef} from 'react';
import {Redirect} from 'react-router';
const Api = require('../modules/api.js');

function File(props) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const refTag = useRef(null);

  useEffect( () => {
    setName( props.FileName );
  }, [])

  const download = () => {
    Api.downloadFile(props.FileName).then( fileURL => {
      setUrl( fileURL );
      refTag.current.click();
    });
  }

  return(
    <div>
      <button onClick={download}> {name} </button>
      <a href={url} ref={refTag} className='display-none' download> {name} </a>)
    </div>
  );
}
//{url && (<a href={url} download> {name} </a>)}
export default File;
