/* list students in the class */

import React, {useEffect, useState} from 'react';
import Student from './Student.js';
const Api = require('../modules/api.js');
const Log = require('../modules/logger.js');


function Class( props ) {
  const [classID, setClassID] = useState('');
  const [className, setClassName] = useState('');
  const [students, setStudents] = useState([]);
  const [addMode, setAddMode] = useState(false);


  /* updates class name
  */
  const handleClassUpdate = (event) => {
    event.preventDefault();
    let newClassName = event.target.firstName.value;

    if( newClassName !== className )
      Api.updateClass(classID, newClassName).then( json => {
        if( json.success )
          setClassName(newClassName);

        Log.append( json.message, true );
      });
    else
      Log.append( "no change in class name detected -- failed", true );
  }


  /* adds extra component used for adding students
  */
  const handleAdd = () => {
    Log.append(`add student mode -- ${!addMode}`, true);
    setAddMode( !addMode )
  }


  /* handle refresh
  */
  const handleRefresh = () => {
    props.RefreshFunc();
    Log.append('refreshing page -- success', true);
  }


  /* handle clearing students from class
  */
  let x = 1;
  const handleClear = () => {
    if( x === 1 ) {
      Log.append(`press again to clear all students from ${className}`, true);
    }
    else if( x === 2 ) {
      Api.clearClass( classID ).then( json => {
        if( json.success )
          props.RefreshFunc();

        Log.append(json.message, true);
      })
    }

    x++;
    if( x > 2 )
      x = 1;
  }


  /* runs when json file is updated
  */
  useEffect( () => {
    setClassID( props.Json.classid );
    setClassName( props.Json.class );
    setStudents( props.Json.students );
  }, [props.Json] );


  /* creates a component for each student
  */
  const Students = () => {
    return ( students.map( (student, index) => {
      return (
        <Student ID={student.id} FirstName={student.firstName} LastName={student.lastName} UserID={student.username} ClassID={classID} RefreshFunc={props.RefreshFunc} key={`student-${index}`} />
      )
    }))
  }


  /* render
  */
  return (
    <div className="student-class">
      <form onSubmit={handleClassUpdate}>
        <input type='text' defaultValue={className} name='firstName' className='text-field class-field' />
      </form>

      <div className="student-class-buttons">
        <button onClick={handleAdd} className='option'> + </button>
        <button onClick={handleRefresh} className='option'> o </button>
        <button onClick={handleClear} className='option'> x </button>
      </div>

      <Students />
      {addMode && ( <Student ID={-1} FirstName='first' LastName='last' UserID='userid' ClassID={classID} RefreshFunc={props.RefreshFunc} New={true} /> )}
    </div>
  );
}

export default Class;
