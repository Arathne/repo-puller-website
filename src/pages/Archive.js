import React, {useEffect} from 'react';
const Log = require('../modules/logger.js');
const Api = require('../modules/api.js');

function Archive() {

  useEffect( () => {
    Log.append('Archive...', true);
    Api.downloadFile('test.zip').then( fileURL => {
      console.log(fileURL);
    } );
  }, [])

  return(
    <div className='archive-page'>
      <h1> Archive </h1>
    </div>
  );
}

export default Archive;
