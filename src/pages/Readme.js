import React, {useEffect} from 'react';
const Log = require('../modules/logger.js');

function Readme() {
  
  useEffect( () => {
    Log.append('Readme Page...', true);
  }, [] );


  return(
    <div className='readme-page'>
      <h1> Readme </h1>
    </div>
  );
}

export default Readme;
