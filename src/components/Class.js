import React, {useEffect, useState} from 'react';

function Class(props) {
  const [className, setClassName] = useState('');
  const [students, setStudents] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log( event.target.firstName.value )
    console.log( event.target.lastName.value )
    console.log( event.target.userid.value )
  }

  const handleFocus = (event) => {
    event.target.parentElement.className += 'active-student';
  }

  const handleBlur = (event) => {
    event.target.parentElement.className = '';
  }

  useEffect( () => {
    setClassName( props.json.class );
    setStudents( props.json.students );
  }, [] );

  return (
    <div>
      <h3> {className} </h3>

      {/* iterates through each students and displays them */}
      {students.map( (student, s_index) => {
        return (
          <form onSubmit={handleSubmit} key={`student-${s_index}`} className='student-form'>
            <div>
              <input type='text' onFocus={handleFocus} onBlur={handleBlur} defaultValue={student.firstName} name='firstName' className='text-field' />
              <input type='text' onFocus={handleFocus} onBlur={handleBlur} defaultValue={student.lastName} name='lastName' className='text-field' />
              <input type='text' onFocus={handleFocus} onBlur={handleBlur} defaultValue={student.userid} name='userid' className='text-field' />
              <button type="submit"></button>
            </div>
          </form> )
      })}
    </div>
  );
}

export default Class;
