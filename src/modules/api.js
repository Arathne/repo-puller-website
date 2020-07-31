/* every function returns a promise of a JSON file */

/* example:
 * const Api = require('../libs/api.js');
 *
 * Api.getStudents().then( data => {
 *  console.log(data)
 * });
*/

const defaultPost = {
  method:"POST",
  cache:"no-cache",
  headers: {
    "content-type": "application/json"
  },
  body: JSON.stringify('')
}

function callApi(route, request) {
  return fetch(route, request).then(res => res.json()).then(data => {
    return data;
  });
}

function getStudents() {
  return callApi('/api/students/all');
}

function updateStudent( oldUserid, newUserid, newFirstName, newLastName ) {
  const student = {
    old_userid: oldUserid,
    userid: newUserid,
    firstname: newFirstName,
    lastname: newLastName
  }

  let post = defaultPost;
  post.body = JSON.stringify(student)
  return callApi('/api/students/update', post)
}

module.exports = {
  getStudents,
  updateStudent
};
