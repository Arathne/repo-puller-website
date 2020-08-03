/* displays all classes w/ students */

import React, {useEffect, useState} from 'react';
import Class from '../components/Class.js';
import Slider from 'react-slick';

const Log = require('../modules/logger.js');
const Api = require('../modules/api.js');


function Students() {
  const [json, setJson] = useState([]);


  /* runs on start
  */
  useEffect( () => {
    async function initialMessage() {
      await Log.append('');
      await Log.append('Students...');
    }

    Api.getStudents().then( data => {
      setJson( data );
    } );

    initialMessage();
  }, [] );

  const refreshA = () => {
    Api.getStudents().then( data => {
      const temp = [...data]
      setJson( temp );
    } );
  }

  /* render
  */
  return(
    <div className='students-page'>
      <h1> Students </h1>

      {/* iterates through an array of objects and then passes object into component */}
      <div className='student-group'>
        <Slider infinite={false}>
        {json.map( (object, index) => {
          return(
            <div key={`student-${index}`} className='student-group-div'>
              <Class json={object} refreshFunc={refreshA} />
            </div> )
        })}
        </Slider>
      </div>
    </div>
  );
}

export default Students;
