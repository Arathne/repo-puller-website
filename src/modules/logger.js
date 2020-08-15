/* log does not keep track of terminal startup text */
const io = require('socket.io-client');
const socket = io();

const logEvent = new Event('logger');
let log = [];
let lastLine = '';
let showRepoUpdate = false;


socket.on('pull-update', (msg) => {
  if( showRepoUpdate )
    append(msg)
})


/* adds line to log
 *    empty (true) to insert empty line first
*/
function append( line, empty ) {
  log.push( lastLine );

  if( empty )
    log.push( "" );

  lastLine = line;
  window.dispatchEvent( logEvent );
}


/* returns the log without last line
*/
function content() {
  return [...log];
}


/* returns last line of log
*/
function last() {
  return lastLine;
}


/* turn on socket-io
*/
function live( bool ) {
  showRepoUpdate = bool;
}


/* public functions
*/
module.exports = {
  append,
  content,
  live,
  last
};
