/* terminal that displays log activity */

import React, {useState, useEffect, useRef} from 'react';
import Startup from '../json/Startup.json';
const Log = require('../modules/logger.js');


function Terminal() {
  const [currentLine, setCurrentLine] = useState(''); // this is always the bottom (autoscrolling)
  const [content, setContent] = useState([]);
  const bottomRef = useRef(null); // focus on bottom element
  const delay = 20; // delay in ms


  /* runs after log has been updated
  */
  function updateTerminal() {
    setCurrentLine( Log.last() );
    setContent( Log.content() );
  }


  /* runs on start
  */
  useEffect( () => {
    window.addEventListener('logger', updateTerminal);

    let data = [];
    Startup.DOS.map( (line, index) => { // map is asyncronous and will print out of order
      Log.append( line )
    });
  }, [])


  /* focus on bottom every render
  */
  useEffect( () => {
    bottomRef.current.scrollIntoView({behavior: 'smooth'});
  }, [content, currentLine]);


  /* converts the current state of the log to H2 tags
  */
  const LogDiv = () => {
    return (
      <div>
        {content.map( (name, index) => {
          return name !== '' ? (<h2 key={index}> {name} </h2>) : (<br key={index}></br>);
        })}
      </div>
    );
  }


  /* render
  */
  return(
    <div className='terminal'>
      <div className='terminal-output'>
        <LogDiv />
        <h2 ref={bottomRef} className='terminal-output-bottom'> {currentLine} </h2>
      </div>
    </div>
  );
}

export default Terminal;
