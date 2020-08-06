import React, {useEffect, useState} from 'react';
import File from '../components/File.js';
const Log = require('../modules/logger.js');
const Api = require('../modules/api.js');

function Archive() {
  const [files, setFiles] = useState([]);

  useEffect( () => {
    Log.append('Archive...', true);
    Api.getAvailableFiles().then( array => {
      setFiles( [...array] );
    } )
  }, [])

  const RenderFiles = () => {
    return (
      files.map( (file, index) => {
        return <File FileName={file} key={index} />
    }))
  }

  return(
    <div className='archive-page'>
      <h1> Archive </h1>
      <RenderFiles />
    </div>
  );
}

export default Archive;
