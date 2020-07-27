from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import requests
import time

app = Flask(__name__)


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


@app.route('/time')
def get_current_time():
  return {'time': time.time()}
