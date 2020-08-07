/* every function returns a promise of a JSON file
 * example:
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


/* all information of accessible classes
*/
function getAll() {
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


/* pull repos
*/
function generateZip( classid ) {
  const student = { classid: classid }
  return callApiPost('/api/zip/generate', student);
}


/* get available files
*/
function getAvailableFiles() {
  const info = { id: 10 }
  return callApiPost('/api/zip', info);
}


/* downloads file from api
 *    gets the response as a blob instead of a json
 *    returns a url of file location
*/
function downloadFile( filename ) {
  const info = { fileName: filename }
  const post = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info),
  }

  return fetch('/api/zip/download', post).then( response => {
    if( response.ok )
      return response.blob()
  }).then( blob => {
    let url = '';
    if( blob ) {
      let file = new File([blob], filename);
      url = window.URL.createObjectURL( file );
    }
    return url;
  })
}


module.exports = {
  getAll,
  generateZip,
  getAvailableFiles,
  downloadFile,
  updateStudent,
  deleteStudent,
  updateClass,
};
