from flask import Flask
import requests
import time

app = Flask(__name__)

def fetch(url):
    response = requests.get(url)
    return response.json()

@app.route('/time')
def get_current_time():
  return {'time': time.time()}

@app.route('/api/top10')
def top10():
    return fetch("https://secure.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=4151")
