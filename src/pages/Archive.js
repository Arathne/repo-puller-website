import React, {useEffect} from 'react';
const Log = require('../modules/logger.js');

function Archive() {

  useEffect( () => {
    Log.append('Archive...', true);
  }, [] );

  return(
    <div className='archive-page'>
      <h1> Archive </h1>
    </div>
  );
}

export default Archive;
