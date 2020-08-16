/* displays information of student which can be changed */

import React, {useEffect, useState, useRef} from 'react';
const Log = require('../modules/logger.js');
const Api = require('../modules/api.js');

function Student( props ) {
  const [id, setId] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userid, setUserID] = useState('');
  const [cssBackground, setCssBackground] = useState('');


  /* runs on start
  */
  useEffect( ()=>{
    setId( props.ID )
    setFirstName( props.FirstName )
    setLastName( props.LastName )
    setUserID( props.UserID )
  }, [])


  /* update student
  */
  const handleUpdate = (event) => {
    event.preventDefault();
    let newFirstName = event.target.firstName.value;
    let newLastName = event.target.lastName.value;
    let newUserid = event.target.userid.value;

    Log.append(`sending request.. :: ${newFirstName} ${newLastName} ${newUserid}`, true);

    Api.updateStudent( id, props.ClassID, newFirstName, newLastName, newUserid ).then( json => {
      if( json.success ) {
        setFirstName( newFirstName );
        setLastName( newLastName );
        setUserID( newUserid );
        props.RefreshFunc();
      }
      Log.append( json.message );
    })
  }


  /* remove student
  */
  const handleRemove = () => {
    if( !props.New ) {
      Api.deleteStudent( id ).then( json => {
        if( json.success )
          props.RefreshFunc();

        Log.append( json.message, true );
      });
    }
  }


  /* changes background when focusing
  */
  const handleFocus = (event) => { setCssBackground('active-student'); }
  const handleFocusLoss = (event) => { setCssBackground(''); }


  /* render
  */
  return (
    <div className={`student-form`}>
      <form onSubmit={handleUpdate}>
        <div className={cssBackground}>
          <input type='text' onFocus={handleFocus} onBlur={handleFocusLoss} defaultValue={firstName} name='firstName' className='text-field student-left' />
          <input type='text' onFocus={handleFocus} onBlur={handleFocusLoss} defaultValue={lastName} name='lastName' className='text-field student-middle' />
          <input type='text' onFocus={handleFocus} onBlur={handleFocusLoss} defaultValue={userid} name='userid' className='text-field' />
          <button type="submit"></button>
        </div>
      </form>
      <button onClick={handleRemove} className={(props.New) ? ('student-button-remove student-button-remove-new option') : ('student-button-remove option')}> - </button>
    </div>
  );
}

export default Student;
