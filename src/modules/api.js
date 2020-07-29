/* every function returns a promise of a JSON file */

/* example:
 * const Api = require('../libs/api.js');
 *
 * Api.getStudents().then( data => {
 *  console.log(data)
 * });
*/


function fetchData(route) {
  return fetch(route).then(res => res.json()).then(data => {
    return data;
  });
}

function getStudents() {
  return fetchData('/api/students');
}

module.exports = {
  getStudents
};
