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

let USERNAME = '';
let PASSWORD = '';


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


/* check to see if username and password are valid
*/
function signIn(username, password) {
  const client = {
    auth_username: username,
    auth_password: password
  }
  return callApiPost('/api/sign-in', client)
}

/* all information of accessible classes
*/
function getClassInfo() {
  const client = {
    auth_username: USERNAME,
    auth_password: PASSWORD
  }
  return callApiPost('/api/info/classes', client);
}


/* general info used for pulling repos
*/
function getGeneralInfo() {
  return callApi('/api/info/general');
}

/* updates existing student or creates a new one when necessary
*/
function updateStudent( id, classid, newFirstName, newLastName, newUserName ) {
  const student = {
    id: id,
    classid: classid,
    firstName: newFirstName,
    lastName: newLastName,
    userName: newUserName,
    auth_username: USERNAME,
    auth_password: PASSWORD
  }
  return callApiPost('/api/students/update', student)
}


/* updates class name
*/
function updateClass( classid, className ) {
  const classObj = {
    classid: classid,
    classname: className,
    auth_username: USERNAME,
    auth_password: PASSWORD
  }
  return callApiPost('/api/class/update', classObj)
}


/* deletes single student
*/
function deleteStudent( id ) {
  const student = {
    id: id ,
    auth_username: USERNAME,
    auth_password: PASSWORD
  }
  return callApiPost('/api/students/delete', student);
}


/* deletes all students from class
*/
function clearClass( classid ) {
  const info = {
    classid: classid,
    auth_username: USERNAME,
    auth_password: PASSWORD
  }
  return callApiPost('/api/class/clear', info);
}


/* deletes all students from class
*/
function clearArchive( classid ) {
  const info = {
    auth_username: USERNAME,
    auth_password: PASSWORD
  }
  return callApiPost('/api/zip/clear', info);
}


/* pull repos
*/
function generateZip( classid, repo ) {
  const info = {
    classid: classid,
    repo: repo,
    auth_username: USERNAME,
    auth_password: PASSWORD
  }
  return callApiPost('/api/zip/generate', info);
}


/* get available files
*/
function getAvailableFiles() {
  const info = {
    id: 10,
    auth_username: USERNAME,
    auth_password: PASSWORD
  }
  return callApiPost('/api/zip', info);
}


/* downloads file from api
 *    gets the response as a blob instead of a json
 *    returns a url of file location
*/
function downloadFile( filename ) {
  const info = {
    fileName: filename,
    auth_username: USERNAME,
    auth_password: PASSWORD
  }

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


/* set username and password used for accessing api
*/
function auth(username, password) {
  USERNAME = username;
  PASSWORD = password;
}

/* public functions
*/
module.exports = {
  signIn,
  auth,
  getClassInfo,
  getGeneralInfo,
  generateZip,
  getAvailableFiles,
  downloadFile,
  updateStudent,
  deleteStudent,
  clearClass,
  clearArchive,
  updateClass
};
