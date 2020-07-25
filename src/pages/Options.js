import React, {useEffect} from 'react';
const Log = require('../modules/logger.js');

function Options() {

  useEffect( () => {
    async function initialMessage() {
      await Log.append('');
      await Log.append('Options...');
    }

    initialMessage();
  }, [] );

  return(
    <div className='options-page'>
      <h1> Options </h1>
    </div>
  );
}

export default Options;
