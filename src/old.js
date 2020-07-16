import React, {useState, useEffect} from 'react';
import '../css/home.css'

const Api = require('../libs/api.js');

function Home() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect( () => {
    Api.getTop10().then( data => {
      setCurrentTime( 0 );
      console.log( data );
    } );
  }, []);

  return(
    <div>
      <div className='Home-Top-Rises'>
        <h1> Price Rises {currentTime} </h1>
      </div>
      <div className='Home-Top-Falls'>
        <h1> Price Falls </h1>
      </div>
    </div>
  );
}

export default Home;
