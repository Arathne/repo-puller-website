/* sign in page that always shows at start */

import React from 'react';
const Log = require('../modules/logger.js');
const Api = require('../modules/api.js')


function LogIn(props) {

  /* authenticate and exit page once successful
  */
  const handleSubmit = (event) => {
    event.preventDefault();
    Log.append('Authenticating...', true);
    let username = event.target[0].value;
    let password = event.target[1].value;

    Api.signIn(username, password).then( json => {
      Log.append( json.message );
      if( json.success ) {
        Api.auth(username, password);
        props.showPage(true);
        Log.live(true);
      }
    })
  }


  /* render
  */
  return (
    <div className='home-page'>
      <h1> Sign In </h1>
      <form onSubmit={handleSubmit}>
        <div className='form'>
          <div> <input type='text' autocomplete="off" name='username' placeholder='username' className='text-field log-in-field' /> </div>
          <div> <input type='password' autocomplete="off" name='domain' placeholder='password' className='text-field log-in-field' /> </div>
          <button className='button' style={{display: 'inline-block'}}> LOGIN </button>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
