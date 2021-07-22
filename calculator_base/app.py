import config, csv, os, time
from flask import Flask, render_template, jsonify, redirect
from binance.client import Client

app = Flask(__name__)

client = Client(config.API_KEY, config.API_SECRET)

# render view
@app.route("/")
def index():
    return render_template('index.html')
    # info = client.get_account()
    # tittle = 'Live View'
    # permissions = info['permissions']
    # print(permissions)
    # return render_template('index.html', tittle=tittle, my_permissions=permissions)
@app.route("/chart-busdusdt")
def busdusdt():
    tittle = "BUSDUSDT"
    return render_template('chart-busdusdt.html', tittle = tittle)

@app.route("/chart-usdtbidr")
def usdtbidr():
    tittle = "USDTBIDR"
    return render_template('chart-usdtbidr.html', tittle = tittle)

@app.route("/chart-ethusdt")
def ethusdt():
    tittle = "ETHUSDT"
    return render_template('chart-ethusdt.html', tittle = tittle)

@app.route("/chart-btcusdt")
def btcusdt():
    tittle = "BTCUSDT"
    return render_template('chart-btcusdt.html', tittle = tittle)

# render cadlestick
@app.route("/render_usdcusdt")
def render_usdcusdt():
    candlestick = client.get_historical_klines("USDCUSDT", Client.KLINE_INTERVAL_5MINUTE, "20 Jul, 2021")

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

@app.route("/render_busdusdt")
def render_busdusdt():
    candlestick = client.get_historical_klines("BUSDUSDT", Client.KLINE_INTERVAL_5MINUTE, "20 Jul, 2021")

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

@app.route("/render_usdtbidr")
def render_usdtbidr():
    candlestick = client.get_historical_klines("USDTBIDR", Client.KLINE_INTERVAL_5MINUTE, "20 Jul, 2021")

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

@app.route("/render_ethusdt")
def render_ethusdt():
    candlestick = client.get_historical_klines("ETHUSDT", Client.KLINE_INTERVAL_5MINUTE, "20 Jul, 2021")

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

@app.route("/render_btcusdt")
def render_btcusdt():
    candlestick = client.get_historical_klines("BTCUSDT", Client.KLINE_INTERVAL_5MINUTE, "20 Jul, 2021")

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

# download csv link 
@app.route('/download_usdcusdt')
def download_usdcusdt():
    # Make dir
    dateYear = time.strftime("%Y/")
    dateMonth = time.strftime("%m/")
    dateDay = time.strftime("%d/")
    path = "D:/" + dateYear + dateMonth + dateDay
    currTime =time.strftime("%H%M%S")
    print()
    if not os.path.exists(path):
        os.makedirs(path)
    else:
        print("folder already exist")

    # --------
    csvfile = open(path + currTime + '-USDCUSDT.csv', 'w', newline='')
    candlestick_writer = csv.writer(csvfile, delimiter=',')
    # candles = client.get_klines(symbol='BNBBTC', interval=Client.KLINE_INTERVAL_15MINUTE)


    candles = client.get_historical_klines("USDCUSDT", Client.KLINE_INTERVAL_15MINUTE, "20 Jul, 2021 UTC+7")
    for candlestick in candles:
        print(candlestick)
        
        candlestick_writer.writerow(candlestick)

    csvfile.close()

    return redirect('/')
    
@app.route('/download_busdusdt')
def download_busdusdt():
    # Make dir
    dateYear = time.strftime("%Y/")
    dateMonth = time.strftime("%m/")
    dateDay = time.strftime("%d/")
    path = "D:/" + dateYear + dateMonth + dateDay
    currTime =time.strftime("%H%M%S")
    print()
    if not os.path.exists(path):
        os.makedirs(path)
    else:
        print("folder already exist")

    # --------
    csvfile = open(path + currTime + '-BUSDUSDT.csv', 'w', newline='')
    candlestick_writer = csv.writer(csvfile, delimiter=',')
    # candles = client.get_klines(symbol='BNBBTC', interval=Client.KLINE_INTERVAL_15MINUTE)


    candles = client.get_historical_klines("BUSDUSDT", Client.KLINE_INTERVAL_15MINUTE, "20 Jul, 2021 UTC+7")
    for candlestick in candles:
        print(candlestick)
        
        candlestick_writer.writerow(candlestick)

    csvfile.close()

    return redirect('/')

@app.route('/download_usdtbidr')
def download_usdtbidr():
    # Make dir
    dateYear = time.strftime("%Y/")
    dateMonth = time.strftime("%m/")
    dateDay = time.strftime("%d/")
    path = "D:/" + dateYear + dateMonth + dateDay
    currTime =time.strftime("%H%M%S")
    print()
    if not os.path.exists(path):
        os.makedirs(path)
    else:
        print("folder already exist")

    # --------
    csvfile = open(path + currTime + '-USDTBIDR.csv', 'w', newline='')
    candlestick_writer = csv.writer(csvfile, delimiter=',')
    # candles = client.get_klines(symbol='BNBBTC', interval=Client.KLINE_INTERVAL_15MINUTE)


    candles = client.get_historical_klines("USDTBIDR", Client.KLINE_INTERVAL_15MINUTE, "20 Jul, 2021 UTC+7")
    for candlestick in candles:
        print(candlestick)
        
        candlestick_writer.writerow(candlestick)

    csvfile.close()

    return redirect('/')

@app.route('/download_ethusdt')
def download_ethusdt():
    # Make dir
    dateYear = time.strftime("%Y/")
    dateMonth = time.strftime("%m/")
    dateDay = time.strftime("%d/")
    path = "D:/" + dateYear + dateMonth + dateDay
    currTime =time.strftime("%H%M%S")
    print()
    if not os.path.exists(path):
        os.makedirs(path)
    else:
        print("folder already exist")

    # --------
    csvfile = open(path + currTime + '-ETHUSDT.csv', 'w', newline='')
    candlestick_writer = csv.writer(csvfile, delimiter=',')
    # candles = client.get_klines(symbol='BNBBTC', interval=Client.KLINE_INTERVAL_15MINUTE)


    candles = client.get_historical_klines("ETHUSDT", Client.KLINE_INTERVAL_15MINUTE, "20 Jul, 2021 UTC+7")
    for candlestick in candles:
        print(candlestick)
        
        candlestick_writer.writerow(candlestick)

    csvfile.close()

    return redirect('/')

@app.route('/download_btcusdt')
def download_btcusdt():
    # Make dir
    dateYear = time.strftime("%Y/")
    dateMonth = time.strftime("%m/")
    dateDay = time.strftime("%d/")
    path = "D:/" + dateYear + dateMonth + dateDay
    currTime =time.strftime("%H%M%S")
    print()
    if not os.path.exists(path):
        os.makedirs(path)
    else:
        print("folder already exist")

    # --------
    csvfile = open(path + currTime + '-BTCUSDT.csv', 'w', newline='')
    candlestick_writer = csv.writer(csvfile, delimiter=',')
    # candles = client.get_klines(symbol='BNBBTC', interval=Client.KLINE_INTERVAL_15MINUTE)


    candles = client.get_historical_klines("BTCUSDT", Client.KLINE_INTERVAL_15MINUTE, "20 Jul, 2021 UTC+7")
    for candlestick in candles:
        print(candlestick)
        
        candlestick_writer.writerow(candlestick)

    csvfile.close()

    return redirect('/')
    