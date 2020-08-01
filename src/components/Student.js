import React, {useEffect, useState} from 'react';
const Log = require('../modules/logger.js');
const Api = require('../modules/api.js');

function Student( props ) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userid, setUserid] = useState('');
  const [cssBackground, setCssBackground] = useState('');
  const [display, setDisplay] = useState('');

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
    await Log.append('');

    Api.updateStudent( userid, newUserid, newFirstName, newLastName, props.ClassID ).then( json => {
      if( json.success ) {
        setFirstName( newFirstName );
        setLastName( newLastName );
        setUserid( newUserid );
      }
      Log.append( json.message );
    })
  }

  const handleRemove = async () => {
    Api.deleteStudent( userid ).then( json => {
      if( json.success )
        setDisplay('display-none');

      Log.append("");
      Log.append( json.message );
    });
  }

  const handleFocus = (event) => {
    setCssBackground('active-student');
  }

  const handleBlur = (event) => {
    setCssBackground('');
  }

  return(
    <div className={`student-form ${display}`}>
      <form onSubmit={handleSubmit}>
        <div className={cssBackground}>
          <input type='text' onFocus={handleFocus} onBlur={handleBlur} defaultValue={firstName} name='firstName' className='text-field' />
          <input type='text' onFocus={handleFocus} onBlur={handleBlur} defaultValue={lastName} name='lastName' className='text-field' />
          <input type='text' onFocus={handleFocus} onBlur={handleBlur} defaultValue={userid} name='userid' className='text-field' />
          <button type="submit"></button>
        </div>
      </form>
      <button onClick={handleRemove} className={'student-button-remove'}> - </button>
    </div>
  );
}

export default Student;
