import React, {useEffect} from 'react';
const Log = require('../modules/logger.js');

function Readme() {

  useEffect( () => {
    Log.append('Readme Page...', true);
  }, [] );


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
          <h4 className='readme-page-info'> moss is not included because it's very unstable and inconsistent </h4>
        </div>
        <div className='readme-page-wrapper'>
          <h3 className='readme-page-hash'>#</h3>
          <h4 className='readme-page-info'> github api key will only be changed manually from the back-end since the server is currently insecure with http </h4>
        </div>
        <div className='readme-page-wrapper'>
          <h3 className='readme-page-hash'>#</h3>
          <h4 className='readme-page-info'> download scripts.py in archive page for instructions to pull repositories locally </h4>
        </div>
        <div className='readme-page-wrapper'>
          <h3 className='readme-page-hash'>#</h3>
          <h4 className='readme-page-info'> good luck! </h4>
        </div>
      </div>

      <div className='page-bottom'> </div>
    </div>
  );
}

export default Readme;
