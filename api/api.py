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

class Students (db.Model):
    userid = db.Column(db.String(40), primary_key=True)
    first = db.Column(db.String(40), nullable=False)
    last = db.Column(db.String(40), nullable=False)

    def toJSON (self):
        data = '\"userid\": \"%s\",' % self.userid
        data += '\"firstName\": \"%s\",' % self.first
        data += '\"lastName\": \"%s\"' % self.last
        return '{ %s }' % data


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api/students')
def get_current_time():
    students = Students.query.all()
    studentsJSON = ''
    for i in range(len(students)):
        studentsJSON += students[i].toJSON()
        if i < len(students)-1:
            studentsJSON += ', '

    return '[ %s ]' % studentsJSON
