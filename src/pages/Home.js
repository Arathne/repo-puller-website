import React, {useState, useEffect} from 'react';
const Log = require('../modules/logger.js')

function Home() {
  const [buttonDisplay, setButtonDisplay] = useState('inline-block');

  async function domainClick() {
    await Log.append('');
    await Log.append("domain that will be searched");
  }

  async function apiClick() {
    await Log.append('');
    await Log.append("API key is required to prevent getting");
    await Log.append("locked out of iupui account");
  }

  async function repoClick() {
    await Log.append('');
    await Log.append("name of the repository that will be");
    await Log.append("downloaded from each of the students");
  }

  async function zipClick() {
    await Log.append('');
    await Log.append("name of the zip file with all the");
    await Log.append("student repositories");
  }


  const handleSubmit = (event) => {
    event.preventDefault();
  }

  async function buttonPressed() {
    await Log.append('');
    await Log.append('Sending Request...');


    setButtonDisplay('none');
  }

  useEffect( () => {
    async function initialMessage() {
      await Log.append('');
      await Log.append('Home...');
    }

    initialMessage();
  }, [] );

  return(
    <div className='home-page'>
      <h1> Home </h1>
      <form onSubmit={handleSubmit}>
        <div className='form'>
          <div className='text-field-div'>
            <h3> Domain :: </h3>
            <input type='text' placeholder='github.iu.edu' name='domain' onClick={domainClick} className='text-field' />
          </div>
          <div className='text-field-div'>
            <h3> Api :: </h3>
            <input type='text' placeholder='7317A*********' name='api' onClick={apiClick} className='text-field' />
          </div>
          <div className='text-field-div'>
            <h3> Repo :: </h3>
            <input type='text' placeholder='csci24000_spring2020_A1' name='repo' onClick={repoClick} className='text-field' />
          </div>
          <div className='text-field-div'>
            <h3> Zip :: </h3>
            <input type='text' placeholder='A1.zip' name='zip' onClick={zipClick} className='text-field' />
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
