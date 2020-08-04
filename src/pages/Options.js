import React, {useEffect} from 'react';
const Log = require('../modules/logger.js');

function Options() {

  useEffect( () => {
    Log.append('Options...', true);
  }, [] );

  return(
    <div className='options-page'>
      <h1> Options </h1>
    </div>
  );
}

export default Options;
