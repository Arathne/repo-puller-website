/* the main challenge with this is that react is asynchronous */

import React, {useState, useEffect, useRef} from 'react';
const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))};

function Terminal() {
  const [text, setText] = useState('');
  const [logBuffer, setLogBuffer] = useState([]);
  const bottomRef = useRef(null);
  const typeDelay = 2;
  let logContent = [''];


  /* adds characters to log in sequential order order w/ delay
   * NOTE: function must be waited on with 'await' or logs may be out of order
   * PARAM:
   *      line       string
  */
  async function lineAnimation( line ) {
    let i;
    let output = '';

    for( i = 0; i < line.length; i++ ) {
      output += line.charAt(i);
      setText( output );
      await sleep( typeDelay );
    }

    logContent.push( output );
  }

  /* runs 'animation' and updates the log buffer
  */
  async function log( input ) {
    await lineAnimation( input );
    setLogBuffer( logContent );
    bottomRef.current.scrollIntoView({behavior: 'smooth'});
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
      await log("a");
      await log("b");
      await log("c");
      await log("d");
      await log("e");
      await log("f");
      await log("g");
      await log("h");
      await log("i");
      await log("g");
      await log("k");
      await log("l");
      await log("m");
      await log("n");
      await log("o");
      await log("p");
      await log("q");
      await log("r");
      await log("s");

    }

    effectAsync();
  }, [])


  /* converts the current state of the log buffer to H2 tags
  */
  const LogDiv = () => {
    return (
      <div>
        {logBuffer.map( (name, index) => {
          return name != '' ? (<h2 key={index}> {name} </h2>) : (<br></br>);
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
        <h2 ref={bottomRef}> {text} </h2>
      </div>
    </div>
  );
}

export default Terminal;
