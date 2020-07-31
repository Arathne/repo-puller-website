import React, {useEffect, useState} from 'react';
const Log = require('../modules/logger.js');
const Api = require('../modules/api.js');

function Student( props ) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userid, setUserid] = useState('');
  const [css, setCss] = useState('');

  useEffect( ()=>{
    setFirstName( props.FirstName )
    setLastName( props.LastName )
    setUserid( props.UserID )
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    let newFirstName = event.target.firstName.value;
    let newLastName = event.target.lastName.value;
    let newUserid = event.target.userid.value;

    await Log.append('');
    await Log.append(`OLD:  ${firstName}, ${lastName}, ${userid}`);
    await Log.append(`NEW:  ${newFirstName}, ${newLastName}, ${newUserid}`);

    Api.updateStudent( userid, newUserid, newFirstName, newLastName ).then( json => {
      if( json.success )
        console.log("updated student")
      else
        console.log("failed updating student")
    })

    /* if successful -- update */
    setFirstName( newFirstName );
    setLastName( newLastName );
    setUserid( newUserid );
  }

  const handleFocus = (event) => { setCss('active-student'); }
  const handleBlur = (event) => { setCss(''); }

  return(
    <form onSubmit={handleSubmit} className='student-form'>
      <div className={css}>
        <input type='text' onFocus={handleFocus} onBlur={handleBlur} defaultValue={firstName} placeholder='first name' name='firstName' className='text-field' />
        <input type='text' onFocus={handleFocus} onBlur={handleBlur} defaultValue={lastName} placeholder='last name' name='lastName' className='text-field' />
        <input type='text' onFocus={handleFocus} onBlur={handleBlur} defaultValue={userid} placeholder='username' name='userid' className='text-field' />
        <button type="submit"></button>
      </div>
    </form>
  );
}

export default Student;
