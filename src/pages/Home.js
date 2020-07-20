import React, {useEffect} from 'react';

function Home() {
  useEffect( () => {
    console.log("START");
    return () => {
      console.log("END");
   };
  }, [])

  return(
    <div className='home-page'>
      <h1> Home </h1>
    </div>
  );
}

export default Home;
