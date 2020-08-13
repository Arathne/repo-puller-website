import React, {useEffect, useState} from 'react';
import File from '../components/File.js';
const Log = require('../modules/logger.js');
const Api = require('../modules/api.js');

function Archive() {
  const [files, setFiles] = useState([]);

  useEffect( () => {
    Log.append('Archive...', true);
    refresh();
  }, [])

  const refresh = () => {
    Api.getAvailableFiles().then( array => {
      setFiles( [...array] );
    })
  }

  const handleRefresh = () => {
    refresh()
    Log.append('refreshing page -- success', true)
  }

  let x = 1;
  const handleClear = () => {
    if( x === 1 ) {
      Log.append('press again to clear archive', true);
    }
    else if( x === 2 ) {
      Api.clearArchive().then( json => {
        if( json.success )
          refresh()

        Log.append(json.message, true);
      })
    }

    x++;
    if( x > 2 )
      x = 1;
  }


  const RenderFiles = () => {
    return (
      files.map( (file, index) => {
        return <File FileName={file} key={index} />
    }))
  }


  return(
    <div className='archive-page'>
      <h1> Archive </h1>

      <div className="student-class-buttons">
      <button onClick={handleRefresh}> o </button>
        <button onClick={handleClear}> x </button>
      </div>

      <RenderFiles />
      <div className='page-bottom'> </div>
    </div>
  );
}

export default Archive;
