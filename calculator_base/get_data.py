from binance.client import Client
from flask import Flask, jsonify
import config, csv, os, time, datetime, requests
import pandas as pd
# from fixerio import Fixerio
# from openexchangerate import OpenExchangesRates

client = Client(config.API_KEY, config.API_SECRET)

# Make dir
# dateYear = time.strftime("%Y/")
# dateMonth = time.strftime("%m/")
# dateDay = time.strftime("%d/")
# path = "D:/" + dateYear + dateMonth + dateDay
# currTime =time.strftime("%H%M%S")
# print()
# if not os.path.exists(path):
#     os.makedirs(path)
# else:
#     print("folder already exist")

# --------
# csvfile = open(path + currTime + '-BTCUSDT.csv', 'w', newline='')
# candlestick_writer = csv.writer(csvfile, delimiter=',')



# Where USD is the base currency you want to use
# candles = client.get_historical_klines("BIDR", Client.KLINE_INTERVAL_15MINUTE, "20 Jul, 2021 UTC+7")
# url = 'https://v6.exchangerate-api.com/v6/486ce12e72c14b8f9dacb78d/latest/USD'
# Making our request
# response = requests.get(url)
# data = response.json()


# for f in fxrios:
#     print(f)
    # print(data)
    
    # candlestick_writer.writerow(candlestick)

# csvfile.close()

# url = 'https://api.exchangerate.host/timeseries?start_date=2020-01-01&end_date=2020-01-04/IDR/'
# processed = []

# response = requests.get(url)
# data = response.json()

# print (data)

# def get_yearly_rates(amount, currency, converted_currency, amount_of_days):
#     today_date = datetime.datetime.now()
#     date_1year (today_date - datetime.timedelta(days=1 * amount_of_days))

#     url = f'https://api.exchangerate.host/timeseries'
#     payload = {'base': currency, 'amount': amount, 'start_date': date_1year.date(), 'end_date':today_date.date()}
#     response = requests.get(url, params=payload)
#     data = response.json()

#     currency_history = {}
#     rate_history_array = []

#     for item in data['rates']:
#         current_date = item
#         currency_rate = data['rates'][item][converted_currency]

#         currency_history[current_date] = [currency_rate]
#         rate_history_array.append(currency_rate)

#     pd_data = pd.DataFrame(currency_history).transpose()
#     pd_data.columns = ['Rate']
#     pd.set_option('display.max_rows', None)

   

#     get_yearly_rates(1, 'EUR', 'GBP', 90)
#     # print(get_yearly_rates)