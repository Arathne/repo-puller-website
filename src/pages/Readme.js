import React, {useEffect} from 'react';
const Log = require('../modules/logger.js');

function Readme() {

  useEffect( () => {
    async function initialMessage() {
      await Log.append('');
      await Log.append('Readme Page...');
    }

    initialMessage();
  }, [] );


  return(
    <div className='readme-page'>
      <h1> Readme </h1>
    </div>
  );
}

export default Readme;
