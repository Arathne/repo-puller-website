/* displays all classes w/ students */
/* I think that the reason this renders slow is because of the slider from slick-react
 * nothing I can do about it
*/

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
    Log.append('Students...', true);
    refresh();
  }, [] );


  /* refresh page
  */
  const refresh = () => {
    Api.getClassInfo().then( data => {
      setJson( [...data] );
    } );
  }


  /* render
  */
  return(
    <div className='students-page'>
      <h1> Students </h1>

      {/* iterates through an array of objects (json) and then seperates each class into their own component */}
      <div className='student-group'>
        <Slider infinite={false} draggable={false}>
        {json.map( (object, index) => {
          return(
            <div key={`student-${index}`} className='student-group-div'>
              <Class Json={object} RefreshFunc={refresh} />
            </div> )
        })}
        </Slider>
      </div>

      <div className='page-bottom'> </div>
    </div>
  );
}

export default Students;
