/* readme page */

import React, {useEffect} from 'react';
const Log = require('../modules/logger.js');

function Readme() {

  /* runs on start
  */
  useEffect( () => {
    Log.append('Readme Page...', true);
  }, [] );


  /* render
  */
  return(
    <div className='readme-page'>
      <h1> Readme </h1>
      <div className='readme-page-wrapper readme-center'>
        <div className='readme-page-top'>
          <div className='readme-page-top-left'>
            <div> <h3> front-end: </h3> </div>
            <div> <h3> back-end: </h3> </div>
            <div> <h3> database: </h3> </div>
          </div>
          <div className='readme-page-top-right'>
            <div> <h3> React </h3> </div>
            <div> <h3> Python/Flask </h3> </div>
            <div> <h3> SQLAlchemy </h3> </div>
          </div>
        </div>
      </div>

      <div className='readme-page-info-wrapper'>
        <div className='readme-page-wrapper'>
          <h3 className='readme-page-hash'>#</h3>
          <h4 className='readme-page-info'> a tool to pull repositories from IU github </h4>
        </div>
        <div className='readme-page-wrapper'>
          <h3 className='readme-page-hash'>#</h3>
          <h4 className='readme-page-info'> moss is not included because it's very unstable and inconsistent (see scripts.zip) </h4>
        </div>
        <div className='readme-page-wrapper'>
          <h3 className='readme-page-hash'>#</h3>
          <h4 className='readme-page-info'> avoid marking submissions at midnight unless you want emails at 1:00am </h4>
        </div>
        <div className='readme-page-wrapper'>
          <h3 className='readme-page-hash'>#</h3>
          <h4 className='readme-page-info'> github API key/username/password will only be changed manually from the back-end since the server is currently insecure with http </h4>
        </div>
        <div className='readme-page-wrapper'>
          <h3 className='readme-page-hash'>#</h3>
          <h4 className='readme-page-info'> to add a class you need to update the database from the back-end. This tool was only intended for 230 and 240 </h4>
        </div>
        <div className='readme-page-wrapper'>
          <h3 className='readme-page-hash'>#</h3>
          <h4 className='readme-page-info'> download scripts.zip in archive page for instructions to pull repositories locally </h4>
        </div>
        <div className='readme-page-wrapper'>
          <h3 className='readme-page-hash'>#</h3>
          <h4 className='readme-page-info'> good luck! </h4>
          <h4 className='readme-page-secret'> you will need it =) </h4>
        </div>
      </div>

      <div className='page-bottom'> </div>
    </div>
  );
}

export default Readme;
