## START #######################################################################

from flask import Flask, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from git import Repo
import shutil
import pathlib
import os
import datetime


app = Flask(__name__, static_folder="../build", static_url_path='/')


## SECRET KEY FOR FLASK SESSION
with open('secret_key') as file:
    app.config['SECRET_KEY'] = file.read()


## ARCHIVE FOLDER
app.config['ROOT'] = pathlib.Path(__file__).parent.absolute()
app.config['ARCHIVE'] = app.config['ROOT'] / 'archive'
app.config['TEMP'] = app.config['ROOT'] / 'temp'


## GITHUB AUTHENTICATION
app.config['USERNAME'] = '260da436e05e0cf2db41c44e386b0d8b6b16b35f' ## dont bother, already regenerated
app.config['PASSWORD'] = 'x-oauth-basic'
app.config['DOMAIN'] = 'github.iu.edu'


## SQL ALCHEMY
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Classes (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    student = db.relationship('Students', backref='classroom')


class Students (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False)
    first = db.Column(db.String(40), nullable=False)
    last = db.Column(db.String(40), nullable=False)
    classid = db.Column(db.Integer, db.ForeignKey('classes.id'))

    def toJSON (self):
        data = '\"id\": \"%s\",' % self.id
        data += '\"username\": \"%s\",' % self.username
        data += '\"firstName\": \"%s\",' % self.first
        data += '\"lastName\": \"%s\"' % self.last
        return '{ %s }' % data



## PRIVATE FUNCTIONS ###########################################################

## converts list of students into json
##
def students_to_json (studentList):
    studentsJSON = ''
    for i in range( len(studentList) ):
        studentsJSON += studentList[i].toJSON()
        if i < len(studentList) - 1:
            studentsJSON += ', '

    return '[ %s ]' % studentsJSON


# @purpose   removes a folder
#    from script-3
#
def removeDirectory( path ):
	shutil.rmtree( path, ignore_errors=True  )


# @purpose   create a folder if it does not exist
#    from script-3
#
def createDirectory( path ):
	if not os.path.exists( path ):
		os.mkdir( path )


# clones repository of a student
#    from script-3
#
def cloneRepo( username, password, domain, student, repo, path, dirName ):

	success = True
	repo = student + '/' + repo + '.git'
	dir = os.path.join( path, dirName )
	createDirectory( dir )

	url = "https://%s:%s@%s/%s" % ( username, password, domain, repo )

	try:
		Repo.clone_from( url, dir, branch='master' )
		#print( "*** SUCCESS ***    " + student )
	except:
		removeDirectory( dir )
		success = False
		#print( "*** FAILED  ***    " + student )

	return success


## creates a log file based on array of strings
##
def create_log(path, filename, stringArray):
    with open(os.path.join(path, filename), 'w') as file:
        all = ''
        for line in stringArray:
            all += line + '\n'
        file.write(all)



## ROUTING #####################################################################

## default
@app.route('/')
def index():
    return app.send_static_file('index.html')


## returns a json file with information of every class
##
@app.route('/api/all', methods = ['GET'])
def classes_to_json():
    studentJSON = ''
    classesList = Classes.query.all()
    for i in range( len(classesList) ):
        studentList = Students.query.filter_by(classroom=classesList[i]).all()
        studentJSON += "{ \"classid\":\"%s\", \"class\":\"%s\", \"students\": %s }" % (classesList[i].id, classesList[i].name, students_to_json(studentList))
        if i < len(classesList) - 1:
            studentJSON += ', '

    return '[ %s ]' % studentJSON


## updates existing student or creates a new one
##    find student by primary key
##    if student found
##       update existing student
##    else
##       create new student [all student entries need a class (classid)]
##
@app.route('/api/students/update', methods = ['POST'])
def update_student():
    success = "false"
    message = ""
    student = request.json

    try:
        query = Students.query.filter_by( id=student['id'] ).first()
        if query != None:
            query.first = student['firstName']
            query.last = student['lastName']
            query.username = student['userName']
            db.session.commit()
            success = "true"
            message = "update student -- success"
        else:
            currentClass = Classes.query.filter_by(id=student['classid']).first()
            if currentClass != None:
                db.session.add( Students(first=student['firstName'], last=student['lastName'], username=student['userName'], classroom=currentClass) )
                db.session.commit()
                success = "true"
                message = "new student -- success"
            else:
                message = "could not find class -- terminating"
    except:
        message = "something went wrong! -- failed"

    return '{ \"success\": %s, \"message\": \"%s\" }' % (success, message)



## deletes student by primary key
##
@app.route('/api/students/delete', methods = ['POST'])
def delete_student():
    student = request.json
    Students.query.filter_by( id=student['id'] ).delete()
    db.session.commit()

    return '{ \"success\": %s, \"message\": \"%s\" }' % ("true", "eliminate student -- success");



## updates the class name
##    searches by primary key
##
@app.route('/api/class/update', methods = ['POST'])
def update_class():
    classInfo = request.json
    message = ""
    success = "false"

    try:
        query = Classes.query.filter_by( id=classInfo['classid'] ).first()
        if query != None:
            query.name = classInfo['classname']
            db.session.commit()
            success = "true"
            message = "update class name -- success"
        else:
            message = "class not found -- terminating"
    except:
        message = "something went wrong! -- failed"

    return '{ \"success\": %s, \"message\": \"%s\" }' % (success, message);



## get available files and return their file names
##    (only name and not the actual file)
##
@app.route('/api/zip', methods = ['POST'])
def get_file_info():
    info = request.json
    jsonPath = ''

    data = app.config['ARCHIVE'].glob('*')
    data = sorted(data, key=os.path.getmtime)
    directory = [x for x in data if x.is_file()]
    for i in range( len(directory) ):
        current = len(directory)-i-1 ## sorted backwards
        jsonPath += '\"%s\"' % directory[current].name
        if i < len(directory) - 1:
            jsonPath += ', '

    return '[ %s ]' % jsonPath


## sends file to client
##
@app.route('/api/zip/download', methods = ['POST'])
def get_file():
    info = request.json
    return send_from_directory(app.config['ARCHIVE'], filename=info['fileName'], as_attachment=True)


## pull repositories of students
##
@app.route('/api/zip/generate', methods = ['POST'])
def pull():
    data = request.json
    classQuery = Classes.query.filter_by(id=data['classid']).first()
    repo = 'csci24000_spring2020_A5'

    root_folder = '%s %s' % (repo, datetime.datetime.now()) # generate unique folder name to prevent pull collisions
    root_folder = os.path.join(app.config['TEMP'], root_folder) # absolute path
    createDirectory(root_folder)

    successLog = [];
    failedLog = [];

    if classQuery:
        studentQuery = Students.query.filter_by(classroom=classQuery).all()
        for student in studentQuery:
            student_folder = '%s-%s' % (student.last, student.first)
            repoResult = cloneRepo( app.config['USERNAME'], app.config['PASSWORD'], app.config['DOMAIN'], student.username, repo, root_folder, student_folder )
            if repoResult:
                successLog.append( "%-20s %-20s" % (student.first, student.last) )
            else:
                failedLog.append( "%-20s %-20s" % (student.first, student.last) )

    create_log( root_folder, 'success.log', successLog )
    create_log( root_folder, 'failed.log', failedLog )

    source = root_folder ## zip contents
    destination = app.config['ARCHIVE'] / os.path.basename(root_folder)
    shutil.make_archive( destination, 'zip', os.path.dirname(source), os.path.basename(source) )

    removeDirectory(root_folder)

    return '{ \"success\": %s, \"message\": \"%s\" }' % ('true', 'testing...');
