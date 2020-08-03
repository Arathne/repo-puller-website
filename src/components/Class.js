import React, {useEffect, useState} from 'react';
import Student from './Student.js';
const Api = require('../modules/api.js');
const Log = require('../modules/logger.js');

function Class( props ) {
  const [classID, setClassID] = useState('');
  const [className, setClassName] = useState('');
  const [students, setStudents] = useState([]);
  const [addMode, setAddMode] = useState(false);

  let unofficial = [];

  const handleSubmit = async (event) => {
    event.preventDefault();
    let newClassName = event.target.firstName.value;

    if( newClassName !== className )
      Api.updateClass(classID, newClassName).then( json => {
        if( json.success )
          setClassName(newClassName);

        Log.append( "" )
        Log.append( json.message );
      });
    else {
      await Log.append( "" );
      await Log.append( "no change in class name detected" );
  }}

  const handleAdd = () => {
    setAddMode( !addMode )
  }

  const handleRefresh = () => {
    props.refreshFunc();
  }

  useEffect( () => {
    setClassID( props.json.classid );
    setClassName( props.json.class );
    setStudents( props.json.students );
  }, [props.json] );

  const Students = () => {
    return ( students.map( (student, index) => {
      return (
        <Student FirstName={student.firstName} LastName={student.lastName} UserID={student.userid} ClassID={classID} refreshFunc={props.refreshFunc} key={`student-${index}`} />
      )
    }))
  }

  return (
    <div className="student-class">
      <form onSubmit={handleSubmit}>
        <input type='text' defaultValue={className} name='firstName' className='text-field class-field' />
      </form>

      <div className="student-class-buttons">
        <button onClick={handleAdd}> + </button>
        <button onClick={handleRefresh}> o </button>
      </div>

      <Students />
      {addMode && ( <Student FirstName={'first'} LastName={'last'} UserID={'userid'} ClassID={classID} refreshFunc={props.refreshFunc} new={true} /> )}
    </div>
  );
}

export default Class;
