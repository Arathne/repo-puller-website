from flask import Flask, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder="../build", static_url_path='/')


## SECRET KEY FOR FLASK SESSION
with open('secret_key') as file:
    app.config['SECRET_KEY'] = file.read()


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



## PRIVATE FUNCTIONS

## converts list of students into json
##
def students_to_json (studentList):
    studentsJSON = ''
    for i in range( len(studentList) ):
        studentsJSON += studentList[i].toJSON()
        if i < len(studentList) - 1:
            studentsJSON += ', '

    return '[ %s ]' % studentsJSON



## ROUTING

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
    db.session.commit();

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


@app.route('/api/download', methods = ['POST'])
def get_file():
    info = request.json
    return send_from_directory('.', filename=info['fileName'], as_attachment=True);
