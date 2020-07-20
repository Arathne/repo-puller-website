/* terminal that displays log activity */
/* the main challenge with this is that react is asynchronous */

import React, {useState, useEffect, useRef} from 'react';
const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))};

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


  /* runs on start
  */
  useEffect( () => {
    async function effectAsync() {
      await log("Award Modular BIOS v4.51PG, An Energy Star Ally");
      await log("Copyright (C) 1984-95, Award Sofware, Inc");
      await log("");
      await log("#401A0-0207");
      await log("");
      await log("PENTIUM-MAX CPU at 200MHz");
      await log("Memory Test : 65536X OK");
      await log("");
      await log("Initialize Plug and Play Cards...");
      await log("PNP Init Completed");
      await log("");
      await log("Detecting Primary Master   ... MAXTOR 6L040J2");
      await log("Detecting Primary Slave    ... ASUS CD-S520/A");
      await log("Detecting Secondary Master ... TOSHIBA CD-ROM 6202D");
      await log("Detecting Secondary Slave  ... TOSHIBA CD-ROM 6202D");
      await log("CMOS Battery Failed");
      await log("");
      await log("Edgar Torrez");
      await log("Potato aaskdkasd");
      await log("Josh White");
      await log("Edgar Torrez");
      await log("Potato aaskdkasd");
      await log("Josh White");
      await log("Edgar Torrez");
      await log("Potato aaskdkasd");
      await log("Josh White");
      await log("Edgar Torrez");
      await log("Potato aaskdkasd");
      await log("Josh White");
      await log("Edgar Torrez");
      await log("Potato aaskdkasd");
      await log("Josh White");
      await log("Edgar Torrez");
      await log("Potato aaskdkasd");
      await log("Josh White");
      await log("Edgar Torrez");
      await log("Potato aaskdkasd");
      await log("Josh White");
      await log("Edgar Torrez");
      await log("Potato aaskdkasd");
      await log("Josh White");
      await log("Edgar Torrez");
      await log("Potato aaskdkasd");
      await log("Josh White");
      await log("Edgar Torrez");
      await log("Potato aaskdkasd");
      await log("Josh White");
    }

    effectAsync();
  }, [])


  /* converts the current state of the log buffer to H2 tags
  */
  const LogDiv = () => {
    return (
      <div>
        {logBuffer.map( (name, index) => {
          return name !== '' ? (<h2 key={index}> {name} </h2>) : (<br></br>);
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
        <h2 ref={bottomRef}> {currentLine} </h2>
      </div>
    </div>
  );
}

export default Terminal;
