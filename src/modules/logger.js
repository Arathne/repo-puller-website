/* log does not keep track of terminal startup text */

const logEvent = new Event('logger');
let log = [''];


/* prints the entire log */
function print() {
  for( let i = 0; i < log.length; i++ )
    console.log( log[i] );
}


/* adds line to log */
function append( line ) {
  log.push( line );
  window.dispatchEvent( logEvent );
}


/* returns the entire log */
function getLog() {
  return log;
}


/* returns last line of log */
function getLast() {
  return log[log.length-1];
}



module.exports = {
  print,
  append,
  getLog,
  getLast
};
