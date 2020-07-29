import React, {useEffect, useState} from 'react';
const Log = require('../modules/logger.js');
const Api = require('../modules/api.js');

function Students() {
  const [json, setJson] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  useEffect( () => {
    async function initialMessage() {
      await Log.append('');
      await Log.append('Students...');
    }

    Api.getStudents().then( data => {
      setJson( data );
    } );

    initialMessage();
  }, [] );

  const RenderStudents = () => {
    return (
      <div className='student-group'>
        {json.map( (object, index) => {

          return(
            <div key={`student-${index}`} className='student-group-div'>
              <h3> {object.class} </h3>
              {object.students.map( (student, s_index) => {
                return (
                  <div key={`student-${index}-${s_index}`}>
                    <input type='text' placeholder={student.firstName} name='firstName' className='text-field' />
                    <input type='text' placeholder={student.lastName} name='lastName' className='text-field' />
                    <input type='text' placeholder={student.userid} name='userid' className='text-field' />
                  </div>
                )})}
            </div>)
        })}
      </div>
    )
  }

  return(
    <div className='students-page'>
      <h1> Students </h1>
      <form onSubmit={handleSubmit}>
        <RenderStudents />
      </form>
    </div>
  );
}

export default Students;
