from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import requests
import time

app = Flask(__name__, static_folder="../build", static_url_path='/')


## SECRET KEY FOR FLASK SESSION
with open('secret_key') as file:
    app.config['SECRET_KEY'] = file.read()


## SQL ALCHEMY
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

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


@app.route('/api/students')
def classes_to_json():
    studentJSON = ''
    classesList = Classes.query.all()
    for i in range( len(classesList) ):
        studentList = Students.query.filter_by(classroom=classesList[i]).all()
        studentJSON += "{ \"class\":\"%s\", \"students\": %s }" % (classesList[i].name, students_to_json(studentList))
        if i < len(classesList) - 1:
            studentJSON += ', '

    return '[ %s ]' % studentJSON
