import React, {useState} from 'react';

function Home() {
  const [buttonDisplay, setButtonDisplay] = useState('inline-block');

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  function buttonPressed() {
    console.log( "button pressed" );
    setButtonDisplay('none');
  }

  return(
    <div className='home-page'>
      <h1> Home </h1>
      <form onSubmit={handleSubmit}>
        <div className='form'>
          <div className='text-field-div'>
            <h3> Domain :: </h3>
            <input type='text' placeholder='github.iu.edu' name='domain' className='text-field' />
          </div>
          <div className='text-field-div'>
            <h3> Api :: </h3>
            <input type='text' placeholder='7317A*********' name='api' className='text-field' />
          </div>
          <div className='text-field-div'>
            <h3> Repo :: </h3>
            <input type='text' placeholder='csci24000_spring2020_A1' name='repo' className='text-field' />
          </div>
          <div className='text-field-div'>
            <h3> Zip :: </h3>
            <input type='text' placeholder='A1.zip' name='zip' className='text-field' />
          </div>
        </div>

        <h3> Set Timer </h3>
        <div>
          <button onClick={buttonPressed} className='button' style={{display: buttonDisplay}}> SEND REQUEST </button>
        </div>
      </form>
    </div>
  );
}

export default Home;
