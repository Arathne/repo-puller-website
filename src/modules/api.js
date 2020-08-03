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

function callApiPost( route, request ) {
  let post = defaultPost;
  post.body = JSON.stringify( request )
  return callApi(route, post)
}

function getStudents() {
  return callApi('/api/students/all');
}

function updateStudent( oldUserid, newUserid, newFirstName, newLastName, classID ) {
  const student = {
    old_userid: oldUserid,
    userid: newUserid,
    firstname: newFirstName,
    lastname: newLastName,
    class: classID
  }

  return callApiPost('/api/students/update', student)
}

function updateClass( classid, className ) {
  const classObj = {
    classid: classid,
    classname: className
  }
  return callApiPost('/api/class/update', classObj)
}

function deleteStudent( userid ) {
  const student = { userid: userid }
  return callApiPost('/api/students/delete', student);
}

function getStudentsByClass( classid ) {
  const classInfo = { classid: classid }
  return callApiPost('/api/class/id', classInfo);
}

module.exports = {
  getStudents,
  getStudentsByClass,
  updateStudent,
  deleteStudent,
  updateClass
};
