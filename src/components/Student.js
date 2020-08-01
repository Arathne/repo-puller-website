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

    Api.updateStudent( userid, newUserid, newFirstName, newLastName, props.ClassID ).then( json => {
      if( json.success ) {
        setFirstName( newFirstName );
        setLastName( newLastName );
        setUserid( newUserid );
      }
    })
  }

  const handleFocus = (event) => { setCss('active-student'); }
  const handleBlur = (event) => { setCss(''); }

  return(
    <form onSubmit={handleSubmit} className='student-form'>
      <div className={css}>
        <input type='text' onFocus={handleFocus} onBlur={handleBlur} defaultValue={firstName} name='firstName' className='text-field' />
        <input type='text' onFocus={handleFocus} onBlur={handleBlur} defaultValue={lastName} name='lastName' className='text-field' />
        <input type='text' onFocus={handleFocus} onBlur={handleBlur} defaultValue={userid} name='userid' className='text-field' />
        <button type="submit"></button>
      </div>
    </form>
  );
}

export default Student;
