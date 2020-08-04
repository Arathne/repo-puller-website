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
  const handleSubmit = async (event) => {
    event.preventDefault();
    let newClassName = event.target.firstName.value;

    if( newClassName !== className )
      Api.updateClass(classID, newClassName).then( json => {
        if( json.success )
          setClassName(newClassName);

        Log.append( json.message, true );
      });
    else {
      await Log.append( "" )
      await Log.append( "no change in class name detected" );
  }}


  /* adds extra component used for adding students
  */
  const handleAdd = () => {
    setAddMode( !addMode )
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
      <form onSubmit={handleSubmit}>
        <input type='text' defaultValue={className} name='firstName' className='text-field class-field' />
      </form>

      <div className="student-class-buttons">
        <button onClick={handleAdd}> + </button>
        <button onClick={props.RefreshFunc}> o </button>
      </div>

      <Students />
      {addMode && ( <Student ID={-1} FirstName='first' LastName='last' UserID='userid' ClassID={classID} RefreshFunc={props.RefreshFunc} New={true} /> )}
    </div>
  );
}

export default Class;
