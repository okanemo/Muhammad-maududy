import config, csv
from flask import Flask, render_template, jsonify
from binance.client import Client

app = Flask(__name__)

client = Client(config.API_KEY, config.API_SECRET)


@app.route("/")
def index():
    tittle = 'Live View'
    info = client.get_account()
    permissions = info['permissions']
    print(permissions)
    return render_template('index.html', tittle=tittle, my_permissions=permissions)

@app.route("/settings")
def settings():
    return "settings"

@app.route("/history")
def history():
    candlestick = client.get_historical_klines("BTCUSDT", Client.KLINE_INTERVAL_5MINUTE, "1 Jun, 2021")

    processed_candlestick = []
    for data in candlestick:
        
        candlestick = {
            "time": data[0] / 1000,
            "open": data[1],
            "high": data[2],
            "low": data[3],
            "close": data[4]
        }

        processed_candlestick.append(candlestick)

    return jsonify(processed_candlestick)