import React, {useEffect} from 'react';
const Log = require('../modules/logger.js');

function Students() {

  useEffect( () => {
    async function initialMessage() {
      await Log.append('');
      await Log.append('Students...');
    }

    initialMessage();
  }, [] );

  return(
    <div className='students-page'>
      <h1> Students </h1>
    </div>
  );
}

export default Students;
