/* terminal that displays log activity */
/* the main challenge with this is that react is asynchronous */

import React, {useState, useEffect, useRef} from 'react';
import Startup from '../json/Startup.json';
const Logger = require('../modules/logger.js');
const sleep = (milliseconds) => { return new Promise(resolve => setTimeout(resolve, milliseconds)) };


function Terminal() {
  const [currentLine, setCurrentLine] = useState(''); // this is always the bottom which allows auto scrolling
  const [logBuffer, setLogBuffer] = useState([]);
  const bottomRef = useRef(null);
  const delay = 15; // delay in ms
  let logContent = ['']; // solves asynchronous issue w/ hooks


  /* updates currentLine and buffer w/ auto scrolling
  */
  async function log( line ) {
    setCurrentLine( line );
    logContent.push( line );
    setLogBuffer( logContent );

    bottomRef.current.scrollIntoView({behavior: 'smooth'});
    await sleep( delay );
  }


  /* runs after log has been updated
  */
  function logEvent() {
    log( Logger.last() );
  }


  /* runs on start
  */
  useEffect( () => {

    /* logging needs to be synchronous
    */
    async function effectAsync() {
      let data = [];
      Startup.DOS.map( (line, index) => { // map is asyncronous and cannot use 'await log()'
        data.push(line);
      });

      for (var i = 0; i < data.length; i++) // print startup info
        await log( data[i] );

      window.addEventListener('logger', logEvent);
    }

    effectAsync();
  }, [])


  /* converts the current state of the log buffer to H2 tags
  */
  const LogDiv = () => {
    return (
      <div>
        {logBuffer.map( (name, index) => {
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
