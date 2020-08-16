/* page to download files */

import React, {useEffect, useState} from 'react';
import File from '../components/File.js';
const Log = require('../modules/logger.js');
const Api = require('../modules/api.js');


function Archive() {
  const [files, setFiles] = useState([]);


  /* runs on start
  */
  useEffect( () => {
    Log.append('Archive...', true);
    refresh();
  }, [])


  /* refresh page
  */
  const refresh = () => {
    Api.getAvailableFiles().then( array => {
      setFiles( [...array] );
    })
  }


  /* add message to terminal and refreshes page
  */
  const handleRefresh = () => {
    refresh()
    Log.append('refreshing page -- success', true)
  }


  /* removes all files when button is double pressed
  */
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


  /* render each file from array
  */
  const RenderFiles = () => {
    return (
      files.map( (file, index) => {
        return <File FileName={file} key={index} />
    }))
  }


  /* render
  */
  return(
    <div className='archive-page'>
      <h1> Archive </h1>

      <div className="student-class-buttons">
        <button onClick={handleRefresh} className='option'> o </button>
        <button onClick={handleClear} className='option'> x </button>
      </div>

      <RenderFiles />
      <div className='page-bottom'> </div>
    </div>
  );
}

export default Archive;
