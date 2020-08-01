from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
import requests
import time
import json

app = Flask(__name__, static_folder="../build", static_url_path='/')


## SECRET KEY FOR FLASK SESSION
with open('secret_key') as file:
    app.config['SECRET_KEY'] = file.read()


## SQL ALCHEMY
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

## for later: each name must be unique
class Classes (db.Model):
    classid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    student = db.relationship('Students', backref='classroom')


class Students (db.Model):
    userid = db.Column(db.String(40), primary_key=True)
    first = db.Column(db.String(40), nullable=False)
    last = db.Column(db.String(40), nullable=False)
    classid = db.Column(db.Integer, db.ForeignKey('classes.classid'))

    def toJSON (self):
        data = '\"userid\": \"%s\",' % self.userid
        data += '\"firstName\": \"%s\",' % self.first
        data += '\"lastName\": \"%s\"' % self.last
        return '{ %s }' % data


def students_to_json (studentList):
    studentsJSON = ''
    for i in range( len(studentList) ):
        studentsJSON += studentList[i].toJSON()
        if i < len(studentList) - 1:
            studentsJSON += ', '

    return '[ %s ]' % studentsJSON


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api/students/all', methods = ['GET'])
def classes_to_json():
    studentJSON = ''
    classesList = Classes.query.all()
    for i in range( len(classesList) ):
        studentList = Students.query.filter_by(classroom=classesList[i]).all()
        studentJSON += "{ \"classid\":\"%s\", \"class\":\"%s\", \"students\": %s }" % (classesList[i].classid, classesList[i].name, students_to_json(studentList))
        if i < len(classesList) - 1:
            studentJSON += ', '

    return '[ %s ]' % studentJSON


@app.route('/api/students/update', methods = ['POST'])
def update_student():
    status = "false"
    message = "updated student"
    student = request.json

    studentClass = Classes.query.filter_by( classid=student['class'] ).first()

    if student['userid'] != student['old_userid']:
        Students.query.filter_by( userid=student['old_userid'] ).delete() # delete old entry and create a new one
        db.session.add( Students( userid=student['userid'], first=student['firstname'], last=student['lastname'], classroom=studentClass ))
        db.session.commit()
        status = "true"
    else:
        query = Students.query.filter_by( userid=student['userid'] ).first() # find existing entry and update it
        if query != None:
            query.first = student['firstname']
            query.last = student['lastname']
            db.session.commit()
            status = "true"
        else:
            message = "student not found"

    return '{ \"success\": %s, \"message\": \"%s\" }' % (status, message)
