import config, csv
from flask import Flask, render_template
from binance.client import Client

app = Flask(__name__)

@app.route("/")
def index():
    tittle = 'Live View'
    return render_template('index.html', tittle=tittle)

@app.route("/settings")
def settings():
    return "settings"