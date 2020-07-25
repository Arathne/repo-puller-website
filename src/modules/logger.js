const logEvent = new Event('logger');

let log = [''];

function print() {
  for( let i = 0; i < log.length; i++ )
    console.log( log[i] );
}

function append( line ) {
  log.push( line );
  window.dispatchEvent(logEvent);
}

function last() {
  return log[ log.length-1 ];
}

module.exports = {
  print,
  append,
  last
};
