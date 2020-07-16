/* every function returns a promise of a JSON file */

/* example:
 * const Api = require('../libs/api.js');
 *
 * Api.getTime().then( data => {
 *  setCurrentTime( data.time );
 * });
*/


function fetchData(route) {
  return fetch(route).then(res => res.json()).then(data => {
    return data;
  });
}

function getTop10() {
  return fetchData('/api/top10');
}

module.exports = {
  getTop10
};
