import React, {useEffect} from 'react';
const Log = require('../modules/logger.js');

function Archive() {

  useEffect( () => {
    async function initialMessage() {
      await Log.append('');
      await Log.append('Archive...');
    }

    initialMessage();
  }, [] );

  return(
    <div className='archive-page'>
      <h1> Archive </h1>
    </div>
  );
}

export default Archive;
