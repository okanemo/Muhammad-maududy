from binance.client import Client
import config, csv, os, time, datetime

# client = Client(config.API_KEY, config.API_SECRET)
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



candles = client.get_historical_klines("BNBBTC", Client.KLINE_INTERVAL_15MINUTE, "2 jan, 2021 UTC+7")
print(candles)
# for candlestick in candles:
#     print(candlestick)
    
#     candlestick_writer.writerow(candlestick)

# csvfile.close()
    