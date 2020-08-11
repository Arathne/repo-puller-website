import React, {useState, useEffect} from 'react';
const Log = require('../modules/logger.js')
const Api = require('../modules/api.js')

function Home() {
  const [buttonDisplay, setButtonDisplay] = useState('inline-block');
  const [api, setApi] = useState('');
  const [classes, setClasses] = useState([]);

  function domainClick() {
    Log.append("domain that will be searched", true);
  }

  function apiClick() {
    Log.append('API key is required to prevent getting', true);
    Log.append('locked out of iupui account');
  }

  function repoClick() {
    Log.append('name of the repository that will be', true)
    Log.append('downloaded from each of the students');
  }


  const handleSubmit = (event) => {
    Log.append('Sending Request...', true);;
    Log.append('Pulling... takes about 2 min', true);
    Log.append('');

    setButtonDisplay('none');
    event.preventDefault();

    let classid = event.target[3].value
    let repo = event.target[2].value

    if( classid ) {
      Api.generateZip(classid, repo).then( json => {
        Log.append(json.message, true);
        Log.append('go to Archive page to download', true);
        setButtonDisplay('inline-block');
      })
    }
  }

  useEffect( () => {
    Log.append('Home...', true);

    Api.getGeneralInfo().then( json => {
      setApi(json.api)
      setClasses(json.classes)
    })
  }, [] );

  const RenderClasses = () => {
    return (
      <select>
        { classes.map( (current, index) => {
          return <option value={current.id} key={index}> {current.name} </option>
        })}
      </select>
    )
  }

  return(
    <div className='home-page'>
      <h1> Home </h1>
      <form onSubmit={handleSubmit}>
        <div className='form'>
          <div className='text-field-div'>
            <h3> Domain :: </h3>
            <input type='text' name='domain' onClick={domainClick} readOnly defaultValue='github.iu.edu' className='text-field' />
          </div>
          <div className='text-field-div'>
            <h3> Api :: </h3>
            <input type='text' defaultValue={api} readOnly name='api' onClick={apiClick} className='text-field' />
          </div>
          <div className='text-field-div'>
            <h3> Repo :: </h3>
            <input type='text' name='repo' defaultValue='csci24000_spring2020_A1' onClick={repoClick} className='text-field font-cyan' />
          </div>
          <div className='text-field-div'>
            <h3> Class :: </h3>
            <div className='home-select'>
              <RenderClasses />
            </div>
          </div>
        </div>

        <div>
          <button className='button' style={{display: buttonDisplay}}> SEND REQUEST </button>
        </div>
      </form>
    </div>
  );
}

export default Home;
