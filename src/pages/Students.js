import React, {useEffect, useState} from 'react';
const Log = require('../modules/logger.js');
const Api = require('../modules/api.js');

function Students() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect( () => {
    async function initialMessage() {
      await Log.append('');
      await Log.append('Students...');
    }

    Api.getTop10().then( data => {
      setCurrentTime( data.time );
      console.log( data );
    } );

    initialMessage();
  }, [] );

  return(
    <div className='students-page'>
      <h1> Students </h1>
      <h1> Price Rises {currentTime} </h1>
    </div>
  );
}

export default Students;
