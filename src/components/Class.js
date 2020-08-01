import React, {useEffect, useState} from 'react';
import Student from './Student.js'

function Class( props ) {
  const [classID, setClassID] = useState('');
  const [className, setClassName] = useState('');
  const [students, setStudents] = useState([]);

  useEffect( () => {
    setClassID( props.json.classid );
    setClassName( props.json.class );
    setStudents( props.json.students );
  }, [] );

  return (
    <div>
      <h3> {className} </h3>

      {/* iterates through each student and displays them */}
      {students.map( (student, s_index) => {
        return (
          <div key={`student-${s_index}`}>
            <Student FirstName={student.firstName} LastName={student.lastName} UserID={student.userid} ClassID={classID} />
          </div>
        )
      })}
    </div>
  );
}

export default Class;
