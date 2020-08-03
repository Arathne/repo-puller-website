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


/* fetch api at specified route
 *    compatible with both get and post request methods
 *       pass in json string for post request
*/
function callApi( route, request ) {
  return fetch(route, request).then(res => res.json()).then(data => {
    return data;
  });
}


/* makes managing post request easier
 *    pass in object and it will do the rest
*/
function callApiPost( route, request ) {
  let post = defaultPost;
  post.body = JSON.stringify( request )
  return callApi(route, post)
}


/* all information accessible
*/
function getStudents() {
  return callApi('/api/all');
}


/* updates existing student or creates a new one when necessary
*/
function updateStudent( id, classid, newFirstName, newLastName, newUserName ) {
  const student = {
    id: id,
    classid: classid,
    firstName: newFirstName,
    lastName: newLastName,
    userName: newUserName
  }

  return callApiPost('/api/students/update', student)
}


/* updates class name
*/
function updateClass( classid, className ) {
  const classObj = {
    classid: classid,
    classname: className
  }
  return callApiPost('/api/class/update', classObj)
}


/* deletes student
*/
function deleteStudent( id ) {
  const student = { id: id }
  return callApiPost('/api/students/delete', student);
}


module.exports = {
  getStudents,
  updateStudent,
  deleteStudent,
  updateClass
};
